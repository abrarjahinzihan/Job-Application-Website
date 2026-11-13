/**
 * TalentForge Recruitment Platform - Core Application Engine
 * Handles Job Filtering, Search, Sorting, Expandable Details, Theme Management,
 * Card Rendering (Grid/List View), and Toast Notifications.
 */

(function () {
  'use strict';

  // State Management
  const AppState = {
    jobs: window.JOB_DATA || [],
    filteredJobs: [],
    currentView: 'grid', // 'grid' or 'list'
    theme: localStorage.getItem('talentforge_theme') || 'light',
    filters: {
      searchQuery: '',
      department: 'all',
      workMode: 'all',
      experience: 'all',
      jobType: 'all',
      minSalary: 0,
      sortBy: 'featured',
      quickTag: 'all'
    }
  };

  // Toast Notification System
  window.showToast = function (message, type = 'info', title = '') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    let iconClass = 'fa-solid fa-circle-info';
    let defaultTitle = 'Notification';

    if (type === 'success') {
      iconClass = 'fa-solid fa-circle-check';
      defaultTitle = 'Success';
    } else if (type === 'error') {
      iconClass = 'fa-solid fa-circle-exclamation';
      defaultTitle = 'Action Required';
    }

    toast.innerHTML = `
      <i class="${iconClass} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${title || defaultTitle}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto dismiss after 4s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  };

  // DOM Elements
  const jobsContainer = document.getElementById('jobsContainer');
  const searchInput = document.getElementById('jobSearchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const departmentFilter = document.getElementById('filterDepartment');
  const workModeFilter = document.getElementById('filterWorkMode');
  const experienceFilter = document.getElementById('filterExperience');
  const jobTypeFilter = document.getElementById('filterJobType');
  const sortSelect = document.getElementById('filterSort');
  const salaryRange = document.getElementById('salaryRange');
  const salaryValueDisplay = document.getElementById('salaryValueDisplay');
  const btnToggleAdvanced = document.getElementById('btnToggleAdvanced');
  const secondaryFiltersRow = document.getElementById('secondaryFiltersRow');
  const btnResetFilters = document.getElementById('btnResetFilters');
  const resultsCount = document.getElementById('resultsCount');
  const btnGridView = document.getElementById('btnGridView');
  const btnListView = document.getElementById('btnListView');
  const themeToggle = document.getElementById('themeToggle');
  const jobDetailsModal = document.getElementById('jobDetailsModal');
  const detailsDrawerBody = document.getElementById('detailsDrawerBody');
  const detailsDrawerTitle = document.getElementById('detailsDrawerTitle');
  const btnApplyFromDetails = document.getElementById('btnApplyFromDetails');
  const btnBookmarkFromDetails = document.getElementById('btnBookmarkFromDetails');

  // Initialize Application
  function init() {
    applyTheme(AppState.theme);
    renderMetrics();
    renderPerksAndCulture();
    setupEventListeners();
    applyFilters();
  }

  // Theme Management
  function applyTheme(theme) {
    AppState.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('talentforge_theme', theme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  function toggleTheme() {
    const nextTheme = AppState.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.showToast(`Switched to ${nextTheme} theme`, 'info');
  }

  // Render Platform Metrics Banner
  function renderMetrics() {
    const metricsContainer = document.getElementById('platformMetrics');
    if (!metricsContainer || !window.PLATFORM_METRICS) return;

    const m = window.PLATFORM_METRICS;
    metricsContainer.innerHTML = `
      <div class="metric-item">
        <span class="metric-number">${m.activeJobs}</span>
        <span class="metric-label">Open Positions</span>
      </div>
      <div class="metric-item">
        <span class="metric-number">${m.globalHubs}</span>
        <span class="metric-label">Global Hubs</span>
      </div>
      <div class="metric-item">
        <span class="metric-number">${m.applicantsPlaced}</span>
        <span class="metric-label">Talents Placed</span>
      </div>
      <div class="metric-item">
        <span class="metric-number">${m.avgResponseTime}</span>
        <span class="metric-label">Avg. Response Time</span>
      </div>
    `;
  }

  // Render Benefits & Perks Section
  function renderPerksAndCulture() {
    const perksContainer = document.getElementById('perksContainer');
    if (!perksContainer || !window.COMPANY_BENEFITS) return;

    perksContainer.innerHTML = window.COMPANY_BENEFITS.map(perk => `
      <div class="perk-card">
        <div class="perk-icon-wrapper">
          <i class="${perk.icon}"></i>
        </div>
        <h4 class="perk-title">${perk.title}</h4>
        <p class="perk-desc">${perk.description}</p>
      </div>
    `).join('');
  }

  // Filtering & Search Engine
  function applyFilters() {
    let list = [...AppState.jobs];
    const { searchQuery, department, workMode, experience, jobType, minSalary, sortBy, quickTag } = AppState.filters;

    // Search Query (title, department, summary, skills)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(job => {
        return (
          job.title.toLowerCase().includes(q) ||
          job.department.toLowerCase().includes(q) ||
          job.summary.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q) ||
          job.techStack.some(t => t.toLowerCase().includes(q))
        );
      });
    }

    // Department Filter
    if (department !== 'all') {
      list = list.filter(job => job.department.toLowerCase() === department.toLowerCase());
    }

    // Work Mode Filter
    if (workMode !== 'all') {
      list = list.filter(job => job.workMode.toLowerCase() === workMode.toLowerCase());
    }

    // Experience Filter
    if (experience !== 'all') {
      list = list.filter(job => job.experience.toLowerCase() === experience.toLowerCase());
    }

    // Job Type Filter
    if (jobType !== 'all') {
      list = list.filter(job => job.type.toLowerCase() === jobType.toLowerCase());
    }

    // Minimum Salary Slider Filter
    if (minSalary > 0) {
      list = list.filter(job => job.salaryMax >= minSalary);
    }

    // Quick Tag Pill Filter
    if (quickTag !== 'all') {
      if (quickTag === 'remote-only') {
        list = list.filter(j => j.workMode.toLowerCase() === 'remote');
      } else if (quickTag === 'urgent-hire') {
        list = list.filter(j => j.urgent);
      } else if (quickTag === 'lead-roles') {
        list = list.filter(j => j.experience === 'Lead & Staff');
      } else if (quickTag === 'entry-level') {
        list = list.filter(j => j.experience === 'Entry-level');
      } else if (quickTag === 'engineering') {
        list = list.filter(j => j.department === 'Engineering');
      }
    }

    // Sorting Logic
    if (sortBy === 'salary-high') {
      list.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sortBy === 'salary-low') {
      list.sort((a, b) => a.salaryMin - b.salaryMin);
    } else if (sortBy === 'title-asc') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.dateTimestamp) - new Date(a.dateTimestamp));
    } else {
      // 'featured'
      list.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
    }

    AppState.filteredJobs = list;
    renderJobListings();
    updateResultsCount();
  }

  function updateResultsCount() {
    if (!resultsCount) return;
    const total = AppState.jobs.length;
    const count = AppState.filteredJobs.length;
    resultsCount.innerHTML = `Showing <span>${count}</span> of ${total} open positions`;
  }

  // Render Job Cards
  function renderJobListings() {
    if (!jobsContainer) return;

    if (AppState.filteredJobs.length === 0) {
      jobsContainer.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1 / -1;">
          <div class="empty-state-icon"><i class="fa-solid fa-briefcase"></i></div>
          <h3 class="empty-state-title">No Matching Opportunities Found</h3>
          <p class="empty-state-desc">Try clearing your filters or adjusting your keyword search to view more roles.</p>
          <button class="btn-primary-apply" id="btnClearAllFiltersEmpty" style="margin: 0 auto;">
            <i class="fa-solid fa-rotate-left"></i> Reset All Filters
          </button>
        </div>
      `;

      const btnClear = document.getElementById('btnClearAllFiltersEmpty');
      if (btnClear) {
        btnClear.addEventListener('click', resetAllFilters);
      }
      return;
    }

    jobsContainer.innerHTML = AppState.filteredJobs.map(job => {
      const isBookmarked = window.ApplicationWorkflow && window.ApplicationWorkflow.isBookmarked(job.id);

      // Work mode badge styling
      let workModeBadge = 'badge-remote';
      if (job.workMode.toLowerCase() === 'hybrid') workModeBadge = 'badge-hybrid';
      else if (job.workMode.toLowerCase() === 'on-site') workModeBadge = 'badge-onsite';

      return `
        <article class="job-card" data-job-id="${job.id}" tabindex="0" aria-label="${job.title} position">
          <div class="job-card-header">
            <div class="badges-row">
              <span class="badge badge-department"><i class="${job.departmentIcon}"></i> ${job.department}</span>
              <span class="badge ${workModeBadge}"><i class="fa-solid fa-location-dot"></i> ${job.workMode}</span>
              ${job.urgent ? `<span class="badge badge-urgent"><i class="fa-solid fa-bolt"></i> Urgent Hire</span>` : ''}
              ${job.featured ? `<span class="badge badge-featured"><i class="fa-solid fa-star"></i> Featured</span>` : ''}
            </div>
            <div class="card-actions-top">
              <button class="btn-share" data-job-id="${job.id}" title="Share this position" aria-label="Share ${job.title}">
                <i class="fa-solid fa-share-nodes"></i>
              </button>
              <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-job-id="${job.id}" title="Bookmark Job" aria-label="Bookmark ${job.title}">
                <i class="${isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
              </button>
            </div>
          </div>

          <h3 class="job-card-title">
            <a href="javascript:void(0)" class="btn-view-details" data-job-id="${job.id}">${job.title}</a>
          </h3>

          <div class="job-meta-row">
            <span class="job-meta-item"><i class="fa-regular fa-clock"></i> ${job.type}</span>
            <span class="job-meta-item"><i class="fa-solid fa-briefcase"></i> ${job.experience}</span>
            <span class="job-meta-item"><i class="fa-regular fa-calendar"></i> Posted ${job.postedDate}</span>
          </div>

          <p class="job-summary">${job.summary}</p>

          <div class="tech-tags-list">
            ${job.techStack.slice(0, 5).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            ${job.techStack.length > 5 ? `<span class="tech-tag">+${job.techStack.length - 5}</span>` : ''}
          </div>

          <div class="job-card-footer">
            <div class="salary-tag-wrapper">
              <span class="salary-text">${job.salaryFormatted}</span>
              <span class="equity-text">${job.equity !== 'N/A' ? 'Equity: ' + job.equity : 'Comprehensive benefits'}</span>
            </div>
            <div class="card-cta-group">
              <button class="btn-secondary-outline btn-view-details" data-job-id="${job.id}">
                <i class="fa-solid fa-circle-info"></i> Details
              </button>
              <button class="btn-primary-apply btn-quick-apply" data-job-id="${job.id}">
                <i class="fa-solid fa-paper-plane"></i> Apply
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachCardEventListeners();
  }

  // Attach Card Event Listeners
  function attachCardEventListeners() {
    // View Details Click
    document.querySelectorAll('.btn-view-details').forEach(el => {
      el.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        openJobDetails(jobId);
      });
    });

    // Quick Apply Click
    document.querySelectorAll('.btn-quick-apply').forEach(el => {
      el.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        if (window.ApplicationWorkflow) {
          window.ApplicationWorkflow.openApplicationModal(jobId);
        }
      });
    });

    // Bookmark Toggle Click
    document.querySelectorAll('.btn-bookmark').forEach(el => {
      el.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        if (window.ApplicationWorkflow) {
          window.ApplicationWorkflow.toggleBookmark(jobId);
        }
      });
    });

    // Share Click
    document.querySelectorAll('.btn-share').forEach(el => {
      el.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        shareJob(jobId);
      });
    });
  }

  // Refresh Bookmark Button states on cards
  window.refreshCardBookmarkButtons = function () {
    document.querySelectorAll('.btn-bookmark').forEach(btn => {
      const jobId = btn.getAttribute('data-job-id');
      const isBookmarked = window.ApplicationWorkflow && window.ApplicationWorkflow.isBookmarked(jobId);
      if (isBookmarked) {
        btn.classList.add('bookmarked');
        btn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
      } else {
        btn.classList.remove('bookmarked');
        btn.innerHTML = `<i class="fa-regular fa-bookmark"></i>`;
      }
    });
  };

  // Expandable Job Details Drawer
  function openJobDetails(jobId) {
    const job = AppState.jobs.find(j => j.id === jobId);
    if (!job || !jobDetailsModal) return;

    if (detailsDrawerTitle) detailsDrawerTitle.textContent = job.title;

    const isBookmarked = window.ApplicationWorkflow && window.ApplicationWorkflow.isBookmarked(job.id);
    if (btnBookmarkFromDetails) {
      btnBookmarkFromDetails.setAttribute('data-job-id', job.id);
      btnBookmarkFromDetails.className = `btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`;
      btnBookmarkFromDetails.innerHTML = `<i class="${isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>`;
    }

    if (btnApplyFromDetails) {
      btnApplyFromDetails.setAttribute('data-job-id', job.id);
    }

    if (detailsDrawerBody) {
      detailsDrawerBody.innerHTML = `
        <div class="drawer-section">
          <div class="badges-row" style="margin-bottom: 14px;">
            <span class="badge badge-department"><i class="${job.departmentIcon}"></i> ${job.department}</span>
            <span class="badge badge-remote"><i class="fa-solid fa-location-dot"></i> ${job.workMode}</span>
            <span class="badge badge-hybrid">${job.type}</span>
            ${job.urgent ? `<span class="badge badge-urgent"><i class="fa-solid fa-bolt"></i> Urgent Hire</span>` : ''}
          </div>

          <div class="job-meta-row" style="font-size: 0.95rem; margin-bottom: 20px;">
            <span><i class="fa-solid fa-location-pin"></i> <strong>Location:</strong> ${job.location}</span>
            <span><i class="fa-solid fa-money-bill-wave"></i> <strong>Compensation:</strong> ${job.salaryFormatted}</span>
            <span><i class="fa-solid fa-chart-pie"></i> <strong>Equity:</strong> ${job.equity}</span>
            <span><i class="fa-regular fa-calendar-check"></i> <strong>Apply by:</strong> ${job.deadline}</span>
          </div>

          <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 24px;">
            ${job.aboutRole}
          </p>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title"><i class="fa-solid fa-list-check" style="color:var(--primary-600)"></i> Key Responsibilities</h4>
          <ul class="drawer-list">
            ${job.responsibilities.map(r => `<li><i class="fa-solid fa-circle-check"></i><span>${r}</span></li>`).join('')}
          </ul>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title"><i class="fa-solid fa-shield-halved" style="color:var(--accent-purple)"></i> Required Qualifications</h4>
          <ul class="drawer-list">
            ${job.requirements.map(req => `<li><i class="fa-solid fa-check"></i><span>${req}</span></li>`).join('')}
          </ul>
        </div>

        ${job.niceToHave && job.niceToHave.length > 0 ? `
          <div class="drawer-section">
            <h4 class="drawer-section-title"><i class="fa-solid fa-wand-magic-sparkles" style="color:var(--accent-amber)"></i> Preferred & Nice-to-Have</h4>
            <ul class="drawer-list">
              ${job.niceToHave.map(nth => `<li><i class="fa-solid fa-star" style="color:var(--accent-amber); font-size: 0.75rem;"></i><span>${nth}</span></li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="drawer-section">
          <h4 class="drawer-section-title"><i class="fa-solid fa-layer-group" style="color:var(--primary-600)"></i> Tech Stack & Tools</h4>
          <div class="tech-tags-list" style="margin-top: 10px;">
            ${job.techStack.map(t => `<span class="tech-tag" style="font-size:0.85rem; padding: 6px 12px;">${t}</span>`).join('')}
          </div>
        </div>

        <div class="drawer-section">
          <h4 class="drawer-section-title"><i class="fa-solid fa-gift" style="color:var(--accent-emerald)"></i> Position Benefits & Total Rewards</h4>
          <ul class="drawer-list">
            ${job.benefits.map(b => `<li><i class="fa-solid fa-circle-check"></i><span>${b}</span></li>`).join('')}
          </ul>
        </div>

        <div class="hiring-manager-card">
          <img src="${job.hiringManager.avatar}" alt="${job.hiringManager.name}" class="hiring-manager-avatar" />
          <div class="hiring-manager-info">
            <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--primary-600); letter-spacing: 0.05em;">Hiring Lead</span>
            <h5>${job.hiringManager.name}</h5>
            <p>${job.hiringManager.title} • TalentForge</p>
          </div>
        </div>
      `;
    }

    jobDetailsModal.classList.add('active');
    jobDetailsModal.setAttribute('aria-hidden', 'false');
  }

  // Share Position Feature
  function shareJob(jobId) {
    const job = AppState.jobs.find(j => j.id === jobId);
    if (!job) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}#job=${job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          window.showToast(`Shareable link for "${job.title}" copied to clipboard!`, "success");
        })
        .catch(() => {
          window.showToast(`Job link: ${shareUrl}`, "info");
        });
    } else {
      window.showToast(`Job link: ${shareUrl}`, "info");
    }
  }

  // Reset all filters to default
  function resetAllFilters() {
    AppState.filters = {
      searchQuery: '',
      department: 'all',
      workMode: 'all',
      experience: 'all',
      jobType: 'all',
      minSalary: 0,
      sortBy: 'featured',
      quickTag: 'all'
    };

    if (searchInput) searchInput.value = '';
    if (btnClearSearch) btnClearSearch.classList.remove('active');
    if (departmentFilter) departmentFilter.value = 'all';
    if (workModeFilter) workModeFilter.value = 'all';
    if (experienceFilter) experienceFilter.value = 'all';
    if (jobTypeFilter) jobTypeFilter.value = 'all';
    if (sortSelect) sortSelect.value = 'featured';
    if (salaryRange) salaryRange.value = 0;
    if (salaryValueDisplay) salaryValueDisplay.textContent = '$0k+';

    document.querySelectorAll('.pill-tag').forEach(tag => {
      tag.classList.toggle('active', tag.getAttribute('data-tag') === 'all');
    });

    applyFilters();
    window.showToast("All filters have been reset.", "info");
  }

  // Setup Global Event Listeners
  function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        AppState.filters.searchQuery = e.target.value;
        if (btnClearSearch) {
          btnClearSearch.classList.toggle('active', e.target.value.length > 0);
        }
        applyFilters();
      });
    }

    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        AppState.filters.searchQuery = '';
        btnClearSearch.classList.remove('active');
        applyFilters();
        searchInput.focus();
      });
    }

    // Filter dropdowns
    if (departmentFilter) {
      departmentFilter.addEventListener('change', (e) => {
        AppState.filters.department = e.target.value;
        applyFilters();
      });
    }

    if (workModeFilter) {
      workModeFilter.addEventListener('change', (e) => {
        AppState.filters.workMode = e.target.value;
        applyFilters();
      });
    }

    if (experienceFilter) {
      experienceFilter.addEventListener('change', (e) => {
        AppState.filters.experience = e.target.value;
        applyFilters();
      });
    }

    if (jobTypeFilter) {
      jobTypeFilter.addEventListener('change', (e) => {
        AppState.filters.jobType = e.target.value;
        applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        AppState.filters.sortBy = e.target.value;
        applyFilters();
      });
    }

    // Salary slider
    if (salaryRange && salaryValueDisplay) {
      salaryRange.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        AppState.filters.minSalary = val;
        salaryValueDisplay.textContent = val > 0 ? `$${val / 1000}k+` : '$0k+';
        applyFilters();
      });
    }

    // Toggle advanced filters row
    if (btnToggleAdvanced && secondaryFiltersRow) {
      btnToggleAdvanced.addEventListener('click', () => {
        const isOpen = secondaryFiltersRow.classList.toggle('open');
        btnToggleAdvanced.classList.toggle('active', isOpen);
        btnToggleAdvanced.setAttribute('aria-expanded', isOpen);
      });
    }

    // Reset filters button
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', resetAllFilters);
    }

    // Quick filter pills
    document.querySelectorAll('.pill-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        document.querySelectorAll('.pill-tag').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        AppState.filters.quickTag = e.currentTarget.getAttribute('data-tag');
        applyFilters();
      });
    });

    // View mode toggle (Grid vs List)
    if (btnGridView && btnListView && jobsContainer) {
      btnGridView.addEventListener('click', () => {
        AppState.currentView = 'grid';
        btnGridView.classList.add('active');
        btnListView.classList.remove('active');
        jobsContainer.classList.remove('list-view');
        jobsContainer.classList.add('grid-view');
      });

      btnListView.addEventListener('click', () => {
        AppState.currentView = 'list';
        btnListView.classList.add('active');
        btnGridView.classList.remove('active');
        jobsContainer.classList.remove('grid-view');
        jobsContainer.classList.add('list-view');
      });
    }

    // Details Modal Action Buttons
    if (btnApplyFromDetails) {
      btnApplyFromDetails.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        if (jobDetailsModal) jobDetailsModal.classList.remove('active');
        if (window.ApplicationWorkflow) {
          window.ApplicationWorkflow.openApplicationModal(jobId);
        }
      });
    }

    if (btnBookmarkFromDetails) {
      btnBookmarkFromDetails.addEventListener('click', (e) => {
        const jobId = e.currentTarget.getAttribute('data-job-id');
        if (window.ApplicationWorkflow) {
          window.ApplicationWorkflow.toggleBookmark(jobId);
          const isBookmarked = window.ApplicationWorkflow.isBookmarked(jobId);
          btnBookmarkFromDetails.className = `btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`;
          btnBookmarkFromDetails.innerHTML = `<i class="${isBookmarked ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>`;
        }
      });
    }

    // Mobile Hamburger Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    if (mobileMenuToggle && mobileNavDrawer) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileNavDrawer.classList.toggle('active');
      });
    }

    // Check deep-linking URL hash (e.g. #job=job-01)
    if (window.location.hash.startsWith('#job=')) {
      const targetId = window.location.hash.replace('#job=', '');
      setTimeout(() => openJobDetails(targetId), 200);
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

