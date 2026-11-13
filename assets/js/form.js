/**
 * TalentForge Recruitment Platform - Form Architecture & Application Workflow
 * Implements Accessible Form Patterns, Regex Validation, Drag-and-Drop File Upload,
 * Multi-Stage Wizard State, LocalStorage Persistence, and Application Status Tracking.
 */

(function () {
  'use strict';

  // State Management
  const ApplicationState = {
    currentJob: null,
    currentStep: 1,
    totalSteps: 4,
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      workAuth: '',
      currentTitle: '',
      experienceYears: '',
      linkedin: '',
      portfolio: '',
      startDate: '',
      desiredSalary: '',
      resumeFile: null,
      resumeFileName: '',
      resumeFileSize: '',
      coverLetter: '',
      referralSource: '',
      diversityDecl: '',
      consentGiven: false
    },
    savedApplications: [],
    bookmarkedJobs: new Set()
  };

  // Storage Keys
  const STORAGE_KEYS = {
    APPLICATIONS: 'talentforge_applications_v1',
    BOOKMARKS: 'talentforge_bookmarks_v1'
  };

  // Regular Expressions for Validation
  const VALIDATION_PATTERNS = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/,
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  };

  // Initialize from LocalStorage
  function initStorage() {
    try {
      const storedApps = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (storedApps) {
        ApplicationState.savedApplications = JSON.parse(storedApps);
      } else {
        // Seed an initial demo application for outstanding showcase
        ApplicationState.savedApplications = [
          {
            refId: "TF-2026-8912",
            jobId: "job-01",
            jobTitle: "Lead Frontend Architect",
            department: "Engineering",
            applicantName: "Alex Rivera",
            email: "alex.rivera@example.com",
            phone: "+1 (555) 234-5678",
            location: "San Francisco, CA",
            resumeName: "Alex_Rivera_Lead_Architect_CV.pdf",
            status: "In Review",
            submittedAt: "Nov 11, 2026",
            stageIndex: 2
          }
        ];
        saveApplicationsToStorage();
      }

      const storedBookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (storedBookmarks) {
        const parsed = JSON.parse(storedBookmarks);
        ApplicationState.bookmarkedJobs = new Set(parsed);
      }
    } catch (e) {
      console.warn("LocalStorage access failed or restricted:", e);
    }
  }

  function saveApplicationsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(ApplicationState.savedApplications));
    } catch (e) {
      console.error("Failed to write to localStorage:", e);
    }
    updateTrackerBadge();
  }

  function saveBookmarksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify([...ApplicationState.bookmarkedJobs]));
    } catch (e) {
      console.error("Failed to save bookmarks:", e);
    }
    updateBookmarkBadge();
  }

  // DOM Elements
  const applicationModal = document.getElementById('applicationModal');
  const applicationForm = document.getElementById('applicationWizardForm');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalJobDept = document.getElementById('modalJobDept');
  const btnPrevStep = document.getElementById('btnPrevStep');
  const btnNextStep = document.getElementById('btnNextStep');
  const btnSubmitApp = document.getElementById('btnSubmitApp');
  const stepperFill = document.getElementById('stepperFill');
  const resumeDropzone = document.getElementById('resumeDropzone');
  const resumeFileInput = document.getElementById('resumeFileInput');
  const attachedFilePreview = document.getElementById('attachedFilePreview');
  const previewFileName = document.getElementById('previewFileName');
  const previewFileSize = document.getElementById('previewFileSize');
  const btnRemoveFile = document.getElementById('btnRemoveFile');
  const coverLetterInput = document.getElementById('coverLetter');
  const charCounter = document.getElementById('charCounter');
  const trackerCountBadge = document.getElementById('trackerCountBadge');
  const bookmarkCountBadge = document.getElementById('bookmarkCountBadge');
  const applicationsListContainer = document.getElementById('applicationsListContainer');
  const savedJobsListContainer = document.getElementById('savedJobsListContainer');

  // Badge Counters Update
  function updateTrackerBadge() {
    if (!trackerCountBadge) return;
    const count = ApplicationState.savedApplications.length;
    trackerCountBadge.textContent = count;
    trackerCountBadge.setAttribute('aria-label', `${count} active applications`);
  }

  function updateBookmarkBadge() {
    if (!bookmarkCountBadge) return;
    const count = ApplicationState.bookmarkedJobs.size;
    bookmarkCountBadge.textContent = count;
    bookmarkCountBadge.setAttribute('aria-label', `${count} saved jobs`);
  }

  // Open Application Modal for a specific Job
  function openApplicationModal(jobId) {
    const job = window.JOB_DATA.find(j => j.id === jobId);
    if (!job) return;

    ApplicationState.currentJob = job;
    ApplicationState.currentStep = 1;

    // Reset Form Data
    resetFormData();

    // Populate Job Info in Header
    if (modalJobTitle) modalJobTitle.textContent = job.title;
    if (modalJobDept) modalJobDept.textContent = `${job.department} • ${job.workMode} • ${job.location}`;

    // Show Step 1
    renderStep(1);

    // Hide Success Screen if previously shown
    const formContainer = document.getElementById('wizardFormContainer');
    const successScreen = document.getElementById('applicationSuccessScreen');
    if (formContainer) formContainer.style.display = 'block';
    if (successScreen) successScreen.style.display = 'none';

    // Show Modal
    if (applicationModal) {
      applicationModal.classList.add('active');
      applicationModal.setAttribute('aria-hidden', 'false');
      // Accessible focus first input
      setTimeout(() => {
        const firstInput = document.getElementById('candidateFirstName');
        if (firstInput) firstInput.focus();
      }, 100);
    }
  }

  function closeApplicationModal() {
    if (applicationModal) {
      applicationModal.classList.remove('active');
      applicationModal.setAttribute('aria-hidden', 'true');
    }
  }

  function resetFormData() {
    if (applicationForm) applicationForm.reset();
    ApplicationState.formData.resumeFile = null;
    ApplicationState.formData.resumeFileName = '';
    ApplicationState.formData.resumeFileSize = '';
    ApplicationState.formData.consentGiven = false;

    if (attachedFilePreview) attachedFilePreview.classList.remove('active');
    if (resumeDropzone) resumeDropzone.style.display = 'block';
    if (charCounter) charCounter.textContent = '0 / 1500';

    clearAllValidationErrors();
  }

  // Stepper Progression Logic
  function renderStep(stepNumber) {
    ApplicationState.currentStep = stepNumber;

    // Update Steps indicators
    for (let i = 1; i <= ApplicationState.totalSteps; i++) {
      const stepEl = document.getElementById(`step-indicator-${i}`);
      const panelEl = document.getElementById(`step-panel-${i}`);

      if (stepEl) {
        stepEl.classList.remove('active', 'completed');
        if (i === stepNumber) {
          stepEl.classList.add('active');
          stepEl.setAttribute('aria-current', 'step');
        } else if (i < stepNumber) {
          stepEl.classList.add('completed');
          stepEl.removeAttribute('aria-current');
        }
      }

      if (panelEl) {
        if (i === stepNumber) {
          panelEl.classList.add('active');
        } else {
          panelEl.classList.remove('active');
        }
      }
    }

    // Update stepper fill bar
    const progressPercent = ((stepNumber - 1) / (ApplicationState.totalSteps - 1)) * 100;
    if (stepperFill) stepperFill.style.width = `${progressPercent}%`;

    // Manage Next/Prev/Submit Button States
    if (btnPrevStep) {
      btnPrevStep.style.visibility = stepNumber === 1 ? 'hidden' : 'visible';
    }

    if (btnNextStep && btnSubmitApp) {
      if (stepNumber === ApplicationState.totalSteps) {
        btnNextStep.style.display = 'none';
        btnSubmitApp.style.display = 'inline-flex';
        populateReviewSummary();
      } else {
        btnNextStep.style.display = 'inline-flex';
        btnSubmitApp.style.display = 'none';
      }
    }

    // Scroll wizard body to top
    const wizardBody = document.querySelector('.wizard-form-body');
    if (wizardBody) wizardBody.scrollTop = 0;
  }

  // Validation Rules by Step
  function validateCurrentStep() {
    clearAllValidationErrors();
    let isValid = true;
    const step = ApplicationState.currentStep;

    if (step === 1) {
      // Step 1: Candidate Identity
      const firstName = document.getElementById('candidateFirstName');
      const lastName = document.getElementById('candidateLastName');
      const email = document.getElementById('candidateEmail');
      const phone = document.getElementById('candidatePhone');
      const location = document.getElementById('candidateLocation');
      const workAuth = document.getElementById('candidateWorkAuth');

      if (!firstName.value.trim()) {
        showFieldError(firstName, 'First name is required.');
        isValid = false;
      }
      if (!lastName.value.trim()) {
        showFieldError(lastName, 'Last name is required.');
        isValid = false;
      }
      if (!email.value.trim()) {
        showFieldError(email, 'Email address is required.');
        isValid = false;
      } else if (!VALIDATION_PATTERNS.email.test(email.value.trim())) {
        showFieldError(email, 'Please enter a valid corporate or personal email.');
        isValid = false;
      }
      if (!phone.value.trim()) {
        showFieldError(phone, 'Phone number is required.');
        isValid = false;
      } else if (!VALIDATION_PATTERNS.phone.test(phone.value.trim())) {
        showFieldError(phone, 'Please enter a valid contact phone number.');
        isValid = false;
      }
      if (!location.value.trim()) {
        showFieldError(location, 'Current location is required.');
        isValid = false;
      }
      if (!workAuth.value) {
        showFieldError(workAuth, 'Please select your work authorization status.');
        isValid = false;
      }

      if (isValid) {
        ApplicationState.formData.firstName = firstName.value.trim();
        ApplicationState.formData.lastName = lastName.value.trim();
        ApplicationState.formData.email = email.value.trim();
        ApplicationState.formData.phone = phone.value.trim();
        ApplicationState.formData.location = location.value.trim();
        ApplicationState.formData.workAuth = workAuth.value;
      }
    } else if (step === 2) {
      // Step 2: Experience & Links
      const currentTitle = document.getElementById('candidateCurrentTitle');
      const expYears = document.getElementById('candidateExpYears');
      const linkedin = document.getElementById('candidateLinkedin');
      const portfolio = document.getElementById('candidatePortfolio');
      const startDate = document.getElementById('candidateStartDate');
      const desiredSalary = document.getElementById('candidateSalary');

      if (!currentTitle.value.trim()) {
        showFieldError(currentTitle, 'Current job title or designation is required.');
        isValid = false;
      }
      if (!expYears.value) {
        showFieldError(expYears, 'Please specify your relevant years of experience.');
        isValid = false;
      }
      if (!linkedin.value.trim()) {
        showFieldError(linkedin, 'LinkedIn profile URL is required.');
        isValid = false;
      } else if (!VALIDATION_PATTERNS.url.test(linkedin.value.trim())) {
        showFieldError(linkedin, 'Please enter a valid URL (e.g., https://linkedin.com/in/username).');
        isValid = false;
      }
      if (portfolio.value.trim() && !VALIDATION_PATTERNS.url.test(portfolio.value.trim())) {
        showFieldError(portfolio, 'Please enter a valid website or portfolio URL.');
        isValid = false;
      }
      if (!startDate.value) {
        showFieldError(startDate, 'Earliest start date is required.');
        isValid = false;
      }

      if (isValid) {
        ApplicationState.formData.currentTitle = currentTitle.value.trim();
        ApplicationState.formData.experienceYears = expYears.value;
        ApplicationState.formData.linkedin = linkedin.value.trim();
        ApplicationState.formData.portfolio = portfolio.value.trim();
        ApplicationState.formData.startDate = startDate.value;
        ApplicationState.formData.desiredSalary = desiredSalary.value.trim();
      }
    } else if (step === 3) {
      // Step 3: Resume Attachment & Supporting Documents
      const resumeError = document.getElementById('resumeErrorMsg');
      if (!ApplicationState.formData.resumeFileName) {
        if (resumeError) {
          resumeError.textContent = 'Please attach your resume in PDF, DOC, or DOCX format (Max 5MB).';
          resumeError.classList.add('visible');
        }
        isValid = false;
      }

      if (coverLetterInput) {
        ApplicationState.formData.coverLetter = coverLetterInput.value.trim();
      }
      const referral = document.getElementById('referralSource');
      if (referral) {
        ApplicationState.formData.referralSource = referral.value;
      }
    } else if (step === 4) {
      // Step 4: Compliance & Consent
      const consentBox = document.getElementById('candidateConsent');
      const consentError = document.getElementById('consentErrorMsg');

      if (!consentBox.checked) {
        if (consentError) {
          consentError.textContent = 'You must acknowledge and consent to the data policy to submit.';
          consentError.classList.add('visible');
        }
        isValid = false;
      } else {
        ApplicationState.formData.consentGiven = true;
      }
      const diversity = document.getElementById('diversityDeclaration');
      if (diversity) {
        ApplicationState.formData.diversityDecl = diversity.value;
      }
    }

    if (!isValid) {
      window.showToast("Please complete all required fields correctly.", "error");
    }

    return isValid;
  }

  function showFieldError(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add('error');
    inputElement.setAttribute('aria-invalid', 'true');

    const parent = inputElement.closest('.form-field');
    if (parent) {
      const errorMsg = parent.querySelector('.field-error-msg');
      if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add('visible');
        errorMsg.setAttribute('role', 'alert');
      }
    }
  }

  function clearAllValidationErrors() {
    document.querySelectorAll('.form-input, .form-textarea, .form-select-field').forEach(el => {
      el.classList.remove('error');
      el.removeAttribute('aria-invalid');
    });
    document.querySelectorAll('.field-error-msg').forEach(el => {
      el.classList.remove('visible');
      el.textContent = '';
    });
  }

  // Populate Review Summary for Step 4
  function populateReviewSummary() {
    const summaryTarget = document.getElementById('reviewSummaryContainer');
    if (!summaryTarget) return;

    const data = ApplicationState.formData;
    const job = ApplicationState.currentJob;

    summaryTarget.innerHTML = `
      <div class="review-grid">
        <div class="review-item">
          <span class="review-item-label">Target Role</span>
          <span class="review-item-value">${job ? job.title : 'N/A'} (${job ? job.department : ''})</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Candidate Name</span>
          <span class="review-item-value">${data.firstName} ${data.lastName}</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Email Address</span>
          <span class="review-item-value">${data.email}</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Contact Phone</span>
          <span class="review-item-value">${data.phone}</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Location & Authorization</span>
          <span class="review-item-value">${data.location} (${data.workAuth})</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Experience & Title</span>
          <span class="review-item-value">${data.currentTitle} • ${data.experienceYears}</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">Resume Attached</span>
          <span class="review-item-value"><i class="fa-solid fa-file-pdf" style="color:var(--accent-rose); margin-right:4px;"></i> ${data.resumeFileName} (${data.resumeFileSize})</span>
        </div>
        <div class="review-item">
          <span class="review-item-label">LinkedIn & Portfolio</span>
          <span class="review-item-value">${data.linkedin} ${data.portfolio ? '• ' + data.portfolio : ''}</span>
        </div>
      </div>
    `;
  }

  // File Upload Handlers (Drag-and-Drop & Input Trigger)
  function setupFileUpload() {
    if (!resumeDropzone || !resumeFileInput) return;

    // Trigger file dialog on click
    resumeDropzone.addEventListener('click', (e) => {
      if (e.target !== resumeFileInput) {
        resumeFileInput.click();
      }
    });

    resumeFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processUploadedFile(e.target.files[0]);
      }
    });

    // Drag and drop events
    ['dragenter', 'dragover'].forEach(eventName => {
      resumeDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropzone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      resumeDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropzone.classList.remove('dragover');
      }, false);
    });

    resumeDropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        processUploadedFile(files[0]);
      }
    });

    // Remove file button
    if (btnRemoveFile) {
      btnRemoveFile.addEventListener('click', () => {
        ApplicationState.formData.resumeFile = null;
        ApplicationState.formData.resumeFileName = '';
        ApplicationState.formData.resumeFileSize = '';
        if (resumeFileInput) resumeFileInput.value = '';
        if (attachedFilePreview) attachedFilePreview.classList.remove('active');
        if (resumeDropzone) resumeDropzone.style.display = 'block';
        window.showToast("Resume attachment removed", "info");
      });
    }

    // Cover letter character count
    if (coverLetterInput && charCounter) {
      coverLetterInput.addEventListener('input', (e) => {
        const length = e.target.value.length;
        charCounter.textContent = `${length} / 1500`;
        if (length > 1500) {
          charCounter.style.color = 'var(--accent-rose)';
        } else {
          charCounter.style.color = 'var(--text-tertiary)';
        }
      });
    }
  }

  function processUploadedFile(file) {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name;
    const fileExt = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    const maxSizeBytes = 5 * 1024 * 1024; // 5MB

    const resumeError = document.getElementById('resumeErrorMsg');
    if (resumeError) resumeError.classList.remove('visible');

    if (!validExtensions.includes(fileExt)) {
      if (resumeError) {
        resumeError.textContent = 'Invalid file type. Please upload a PDF, DOC, or DOCX document.';
        resumeError.classList.add('visible');
      }
      window.showToast("Invalid file format. Please upload PDF or DOC.", "error");
      return;
    }

    if (file.size > maxSizeBytes) {
      if (resumeError) {
        resumeError.textContent = 'File exceeds maximum limit of 5MB. Please choose a smaller file.';
        resumeError.classList.add('visible');
      }
      window.showToast("File size too large (max 5MB).", "error");
      return;
    }

    // Format file size
    const sizeFormatted = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    // Store in State
    ApplicationState.formData.resumeFile = file;
    ApplicationState.formData.resumeFileName = fileName;
    ApplicationState.formData.resumeFileSize = sizeFormatted;

    // Update UI Preview
    if (previewFileName) previewFileName.textContent = fileName;
    if (previewFileSize) previewFileSize.textContent = sizeFormatted;
    if (attachedFilePreview) attachedFilePreview.classList.add('active');
    if (resumeDropzone) resumeDropzone.style.display = 'none';

    window.showToast(`Resume attached: ${fileName}`, "success");
  }

  // Application Submission Execution
  function handleApplicationSubmit() {
    if (!validateCurrentStep()) return;

    // Show loading spinner on button
    btnSubmitApp.disabled = true;
    const originalText = btnSubmitApp.innerHTML;
    btnSubmitApp.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;

    // Simulate async submission
    setTimeout(() => {
      btnSubmitApp.disabled = false;
      btnSubmitApp.innerHTML = originalText;

      // Generate Reference ID (e.g. TF-2026-XXXX)
      const randomRef = Math.floor(1000 + Math.random() * 9000);
      const referenceId = `TF-2026-${randomRef}`;

      // Create new application record
      const newApplication = {
        refId: referenceId,
        jobId: ApplicationState.currentJob.id,
        jobTitle: ApplicationState.currentJob.title,
        department: ApplicationState.currentJob.department,
        applicantName: `${ApplicationState.formData.firstName} ${ApplicationState.formData.lastName}`,
        email: ApplicationState.formData.email,
        phone: ApplicationState.formData.phone,
        location: ApplicationState.formData.location,
        resumeName: ApplicationState.formData.resumeFileName,
        status: "Submitted",
        submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        stageIndex: 1
      };

      // Add to front of applications list
      ApplicationState.savedApplications.unshift(newApplication);
      saveApplicationsToStorage();

      // Show Success Screen
      const formContainer = document.getElementById('wizardFormContainer');
      const successScreen = document.getElementById('applicationSuccessScreen');
      const refTag = document.getElementById('successReferenceId');
      const successCandidateName = document.getElementById('successCandidateName');

      if (formContainer) formContainer.style.display = 'none';
      if (successScreen) successScreen.style.display = 'block';
      if (refTag) refTag.textContent = referenceId;
      if (successCandidateName) successCandidateName.textContent = ApplicationState.formData.firstName;

      window.showToast("Application successfully submitted!", "success");
    }, 1200);
  }

  // Render "My Applications" Drawer
  function renderApplicationsTracker() {
    if (!applicationsListContainer) return;

    const apps = ApplicationState.savedApplications;
    if (apps.length === 0) {
      applicationsListContainer.innerHTML = `
        <div class="empty-state-box" style="padding: 40px 16px; margin: 0;">
          <div class="empty-state-icon"><i class="fa-solid fa-inbox"></i></div>
          <h4 class="empty-state-title">No Applications Yet</h4>
          <p class="empty-state-desc">You have not submitted any job applications yet. Explore our open roles and apply!</p>
        </div>
      `;
      return;
    }

    applicationsListContainer.innerHTML = apps.map(app => {
      let statusClass = 'app-status-submitted';
      if (app.status === 'In Review') statusClass = 'app-status-review';
      else if (app.status === 'Interview') statusClass = 'app-status-interview';
      else if (app.status === 'Offer') statusClass = 'app-status-offer';
      else if (app.status === 'Withdrawn') statusClass = 'app-status-withdrawn';

      return `
        <div class="app-tracker-card" data-ref="${app.refId}">
          <div class="app-tracker-header">
            <div>
              <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-tertiary);">${app.refId} • ${app.submittedAt}</span>
              <h4 style="font-size: 1.15rem; margin-top: 2px;">${app.jobTitle}</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">${app.department} • Candidate: ${app.applicantName}</p>
            </div>
            <span class="app-status-badge ${statusClass}">${app.status}</span>
          </div>

          <!-- Stage Timeline -->
          <div class="app-progress-bar-container" title="Status: ${app.status}">
            <div class="app-progress-dot ${app.stageIndex >= 1 ? 'active' : ''}" title="Submitted"></div>
            <div class="app-progress-dot ${app.stageIndex >= 2 ? 'active' : ''}" title="In Review"></div>
            <div class="app-progress-dot ${app.stageIndex >= 3 ? 'active' : ''}" title="Interview"></div>
            <div class="app-progress-dot ${app.stageIndex >= 4 ? 'active' : ''}" title="Decision / Offer"></div>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:var(--text-tertiary);">
            <span>Submitted</span>
            <span>Review</span>
            <span>Interview</span>
            <span>Offer</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 8px; border-top: 1px solid var(--border-subtle);">
            <span style="font-size: 0.82rem; color: var(--text-secondary);">
              <i class="fa-solid fa-file-pdf" style="color:var(--accent-rose); margin-right:4px;"></i> ${app.resumeName || 'Resume.pdf'}
            </span>
            ${app.status !== 'Withdrawn' ? `
              <button class="btn-reset-filters btn-withdraw-app" data-ref="${app.refId}" style="padding: 4px 8px; font-size: 0.8rem;">
                <i class="fa-solid fa-ban"></i> Withdraw
              </button>
            ` : `
              <span style="font-size: 0.78rem; color: var(--text-tertiary); font-style: italic;">Application Withdrawn</span>
            `}
          </div>
        </div>
      `;
    }).join('');

    // Attach Withdraw Handlers
    document.querySelectorAll('.btn-withdraw-app').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ref = e.currentTarget.getAttribute('data-ref');
        withdrawApplication(ref);
      });
    });
  }

  function withdrawApplication(refId) {
    if (!confirm(`Are you sure you wish to withdraw application ${refId}? This cannot be undone.`)) {
      return;
    }
    const app = ApplicationState.savedApplications.find(a => a.refId === refId);
    if (app) {
      app.status = 'Withdrawn';
      app.stageIndex = 0;
      saveApplicationsToStorage();
      renderApplicationsTracker();
      window.showToast(`Application ${refId} has been withdrawn`, "info");
    }
  }

  // Render Saved Jobs Drawer
  function renderSavedJobsDrawer() {
    if (!savedJobsListContainer) return;

    const bookmarkedIds = [...ApplicationState.bookmarkedJobs];
    if (bookmarkedIds.length === 0) {
      savedJobsListContainer.innerHTML = `
        <div class="empty-state-box" style="padding: 40px 16px; margin: 0;">
          <div class="empty-state-icon"><i class="fa-regular fa-bookmark"></i></div>
          <h4 class="empty-state-title">No Saved Jobs</h4>
          <p class="empty-state-desc">Click the bookmark icon on any job card to save it for quick review later.</p>
        </div>
      `;
      return;
    }

    const savedJobs = window.JOB_DATA.filter(j => ApplicationState.bookmarkedJobs.has(j.id));
    savedJobsListContainer.innerHTML = savedJobs.map(job => `
      <div class="saved-job-item">
        <div>
          <span style="font-size: 0.76rem; font-weight: 700; color: var(--primary-600);">${job.department} • ${job.workMode}</span>
          <h5 style="font-size: 1rem; margin: 2px 0;">${job.title}</h5>
          <span style="font-size: 0.82rem; color: var(--text-secondary); font-weight: 600;">${job.salaryFormatted}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn-primary-apply btn-apply-from-saved" data-job-id="${job.id}" style="padding: 6px 12px; font-size: 0.8rem;">
            Apply
          </button>
          <button class="btn-bookmark bookmarked btn-remove-saved" data-job-id="${job.id}" title="Remove from saved">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    `).join('');

    // Attach actions
    document.querySelectorAll('.btn-apply-from-saved').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        closeModal('savedJobsModal');
        openApplicationModal(jobId);
      });
    });

    document.querySelectorAll('.btn-remove-saved').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        toggleBookmark(jobId);
        renderSavedJobsDrawer();
      });
    });
  }

  function toggleBookmark(jobId) {
    if (ApplicationState.bookmarkedJobs.has(jobId)) {
      ApplicationState.bookmarkedJobs.delete(jobId);
      window.showToast("Job removed from bookmarks", "info");
    } else {
      ApplicationState.bookmarkedJobs.add(jobId);
      window.showToast("Job saved to your bookmarks!", "success");
    }
    saveBookmarksToStorage();
    if (window.refreshCardBookmarkButtons) {
      window.refreshCardBookmarkButtons();
    }
  }

  // Setup Event Listeners
  function setupFormEventListeners() {
    initStorage();
    setupFileUpload();

    if (btnNextStep) {
      btnNextStep.addEventListener('click', () => {
        if (validateCurrentStep()) {
          renderStep(ApplicationState.currentStep + 1);
        }
      });
    }

    if (btnPrevStep) {
      btnPrevStep.addEventListener('click', () => {
        if (ApplicationState.currentStep > 1) {
          renderStep(ApplicationState.currentStep - 1);
        }
      });
    }

    if (btnSubmitApp) {
      btnSubmitApp.addEventListener('click', (e) => {
        e.preventDefault();
        handleApplicationSubmit();
      });
    }

    // Modal Close Triggers
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.currentTarget.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });

    // Keyboard Esc close support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
          modal.setAttribute('aria-hidden', 'true');
        });
      }
    });

    // Success Screen Button Actions
    const btnViewInTracker = document.getElementById('btnViewInTracker');
    if (btnViewInTracker) {
      btnViewInTracker.addEventListener('click', () => {
        closeApplicationModal();
        openModal('applicationsModal');
      });
    }

    // Header buttons
    const btnOpenTracker = document.getElementById('btnOpenTracker');
    if (btnOpenTracker) {
      btnOpenTracker.addEventListener('click', () => {
        openModal('applicationsModal');
      });
    }

    const btnOpenSaved = document.getElementById('btnOpenSaved');
    if (btnOpenSaved) {
      btnOpenSaved.addEventListener('click', () => {
        openModal('savedJobsModal');
      });
    }
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (modalId === 'applicationsModal') renderApplicationsTracker();
    if (modalId === 'savedJobsModal') renderSavedJobsDrawer();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Public Exports to Window
  window.ApplicationWorkflow = {
    openApplicationModal,
    closeApplicationModal,
    toggleBookmark,
    isBookmarked: (id) => ApplicationState.bookmarkedJobs.has(id),
    openModal,
    closeModal,
    renderApplicationsTracker,
    renderSavedJobsDrawer
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFormEventListeners);
  } else {
    setupFormEventListeners();
  }
})();

