/* ============================================
   University Activities Guide - Main JavaScript
   WP1 Project - Syrian Virtual University
   Author: Student
   ============================================ */

// ============================================
// 1. Dark Mode Toggle with localStorage
// ============================================

function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;

  // Check saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  toggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  });
}

// ============================================
// 2. Scroll-to-Top Button
// ============================================

function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================
// 3. Event Filtering (Category + Search + Date)
// ============================================

// Events data - shared across pages
const eventsData = [
  {
    id: 1,
    title: "مهرجان التراث الثقافي السوري",
    category: "cultural",
    date: "2026-07-15",
    time: "18:00",
    location: "قاعة الأمسيات - المبنى الرئيسي",
    image: "img/real-graduation.jpg",
    description: "احتفال بالتراث الثقافي السوري يتضمن عروضاً للفنون الشعبية والموسيقى التقليدية والحرف اليدوية. فرصة للطلاب للتعرف على ثقافاتهم وتبادل الخبرات.",
    badge: "ثقافي",
    badgeClass: "badge-cultural"
  },
  {
    id: 2,
    title: "بطولة كرة القدم الجامعية",
    category: "sports",
    date: "2026-07-18",
    time: "16:00",
    location: "الملعب الرياضي الجامعي",
    image: "img/real-sports.jpg",
    description: "بطولة كرة القدم السنوية بين كليات الجامعة. فعالية رياضية حماسية تشجع على الروح الرياضية والتنافس الشريف.",
    badge: "رياضي",
    badgeClass: "badge-sports"
  },
  {
    id: 3,
    title: "معرض الفنون التشكيلية",
    category: "art",
    date: "2026-07-20",
    time: "10:00",
    location: "قاعة المعارض - مبنى الفنون",
    image: "img/real-digital.jpg",
    description: "معرض يضم أعمالاً فنية متنوعة من إبداعات طلاب الجامعة في مجالات الرسم والنحت والتصوير الفوتوغرافي.",
    badge: "فني",
    badgeClass: "badge-art"
  },
  {
    id: 4,
    title: "هاكاثون البرمجة والابتكار",
    category: "tech",
    date: "2026-07-25",
    time: "09:00",
    location: "مركز الحوسبة - المبنى التقني",
    image: "img/real-programming.jpg",
    description: "تحدي برمجة على مدار 48 ساعة للطلاب المهتمين بتطوير البرمجيات والتطبيقات. جوائز قيمة للفائزين.",
    badge: "تقني",
    badgeClass: "badge-tech"
  },
  {
    id: 5,
    title: "لقاء الطلاب الأسبوعي",
    category: "weekly",
    date: "2026-07-12",
    time: "14:00",
    location: "الساحة الخارجية - البهو الرئيسي",
    image: "img/real-volunteer.jpg",
    description: "لقاء اجتماعي أسبوعي للطلاء للتواصل وتبادل الأفكار والخبرات الأكاديمية في أجواء ودية ومريحة.",
    badge: "أسبوعي",
    badgeClass: "badge-weekly"
  },
  {
    id: 6,
    title: "معرض العلوم والابتكار",
    category: "tech",
    date: "2026-08-01",
    time: "11:00",
    location: "قاعة المؤتمرات العلمية",
    image: "img/real-science.jpg",
    description: "عرض لمشاريع علمية مبتكرة في مجالات الهندسة والطب والعلوم الطبيعية. فرصة للطلاب لعرض أبحاثهم.",
    badge: "علمي",
    badgeClass: "badge-science"
  },
  {
    id: 7,
    title: "أمسية موسيقية كلاسيكية",
    category: "cultural",
    date: "2026-08-05",
    time: "19:00",
    location: "المسرح الجامعي",
    image: "img/event-music.jpg",
    description: "أمسية موسيقية تضم عروضاً لفرقة الجامعة الموسيقية بمختلف الآلات الشرقية والغربية.",
    badge: "موسيقي",
    badgeClass: "badge-music"
  },
  {
    id: 8,
    title: "ندوة الأمن السيبراني",
    category: "tech",
    date: "2026-08-10",
    time: "13:00",
    location: "قاعة المحاضرات الرئيسية",
    image: "img/real-entrepreneur.jpg",
    description: "ندوة تثقيفية حول الأمن السيبراني وأهمية حماية البيانات في العصر الرقمي. يقدمها خبراء متخصصون.",
    badge: "تقني",
    badgeClass: "badge-tech"
  }
];

function initEventFiltering() {
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const dateFilter = document.getElementById('dateFilter');
  const eventsContainer = document.getElementById('eventsContainer');

  if (!eventsContainer) return;

  // A category passed in the URL (e.g. events.html?category=sports) takes
  // priority over any saved preference, so category links from other pages work.
  const urlCategory = new URLSearchParams(window.location.search).get('category');

  // Load saved filter preferences from localStorage
  const savedCategory = urlCategory || localStorage.getItem('filterCategory') || 'all';
  const savedSearch = localStorage.getItem('filterSearch') || '';
  const savedDate = localStorage.getItem('filterDate') || '';

  // Persist the URL category so it survives the reset/other interactions
  if (urlCategory) localStorage.setItem('filterCategory', urlCategory);

  if (categoryFilter) categoryFilter.value = savedCategory;
  if (searchInput) searchInput.value = savedSearch;
  if (dateFilter) dateFilter.value = savedDate;

  // Initial render
  filterAndRenderEvents();

  // Event listeners
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      localStorage.setItem('filterCategory', this.value);
      filterAndRenderEvents();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function() {
      localStorage.setItem('filterSearch', this.value);
      filterAndRenderEvents();
    });
  }

  if (dateFilter) {
    dateFilter.addEventListener('change', function() {
      localStorage.setItem('filterDate', this.value);
      filterAndRenderEvents();
    });
  }

  function filterAndRenderEvents() {
    const category = categoryFilter ? categoryFilter.value : 'all';
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const date = dateFilter ? dateFilter.value : '';

    let filtered = eventsData.filter(event => {
      const matchCategory = category === 'all' || event.category === category;
      const matchSearch = !search || 
        event.title.toLowerCase().includes(search) || 
        event.description.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search);
      const matchDate = !date || event.date === date;
      return matchCategory && matchSearch && matchDate;
    });

    renderEvents(filtered);
  }

  function renderEvents(events) {
    if (events.length === 0) {
      eventsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="bi bi-search" style="font-size: 3rem; color: var(--text-muted);"></i>
          <p class="mt-3 text-muted">لا توجد فعاليات مطابقة لمعايير البحث</p>
          <button class="btn btn-outline-custom mt-2" onclick="resetFilters()">
            <i class="bi bi-arrow-counterclockwise"></i> إعادة ضبط الفلاتر
          </button>
        </div>
      `;
      return;
    }

    eventsContainer.innerHTML = events.map(event => `
      <div class="col-lg-4 col-md-6 mb-4 slide-up">
        <div class="card event-card h-100">
          <div class="card-img-wrapper">
            <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
            <span class="badge ${event.badgeClass} position-absolute top-0 end-0 m-2">${event.badge}</span>
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${event.title}</h5>
            <div class="event-meta">
              <span><i class="bi bi-calendar3"></i> ${formatDate(event.date)}</span>
              <span><i class="bi bi-geo-alt"></i> ${event.location}</span>
            </div>
            <p class="card-text flex-grow-1">${event.description.substring(0, 100)}...</p>
            <a href="event.html?id=${event.id}" class="btn btn-primary-custom mt-auto">
              <i class="bi bi-info-circle"></i> التفاصيل
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function resetFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const searchInput = document.getElementById('searchInput');
  const dateFilter = document.getElementById('dateFilter');

  if (categoryFilter) categoryFilter.value = 'all';
  if (searchInput) searchInput.value = '';
  if (dateFilter) dateFilter.value = '';

  localStorage.removeItem('filterCategory');
  localStorage.removeItem('filterSearch');
  localStorage.removeItem('filterDate');

  // Trigger filter update
  if (categoryFilter) categoryFilter.dispatchEvent(new Event('change'));
}

// ============================================
// 4. Load Event Details (for event.html)
// ============================================

function loadEventDetails() {
  const container = document.getElementById('eventDetailContainer');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = parseInt(urlParams.get('id'));

  const event = eventsData.find(e => e.id === eventId);

  if (!event) {
    container.innerHTML = `
      <div class="container py-5 text-center">
        <i class="bi bi-exclamation-triangle" style="font-size: 4rem; color: var(--secondary-color);"></i>
        <h3 class="mt-3">الفعالية غير موجودة</h3>
        <p class="text-muted">لم نتمكن من العثور على الفعالية المطلوبة</p>
        <a href="events.html" class="btn btn-primary-custom">
          <i class="bi bi-arrow-right"></i> العودة للفعاليات
        </a>
      </div>
    `;
    return;
  }

  // Set page title
  document.title = `${event.title} - دليل فعاليات الجامعة`;

  // Keep a reference to the current event (used by "Add to Calendar")
  window.currentEvent = event;

  // Build a small image gallery: this event's image + two other events' images
  const otherImages = eventsData.filter(e => e.id !== event.id).map(e => e.image);
  const gallery = [event.image, otherImages[0], otherImages[1]];

  // Render event details
  container.innerHTML = `
    <!-- Event Hero -->
    <div class="event-hero">
      <img src="${event.image}" alt="${event.title}">
      <div class="event-hero-overlay">
        <div class="container">
          <span class="badge ${event.badgeClass} mb-2">${event.badge}</span>
          <h1 class="display-5 fw-bold">${event.title}</h1>
          <p class="mb-0"><i class="bi bi-calendar3"></i> ${formatDate(event.date)} | <i class="bi bi-clock"></i> ${event.time}</p>
        </div>
      </div>
    </div>

    <!-- Event Content -->
    <div class="container py-5">
      <div class="row g-4">
        <!-- Main Content -->
        <div class="col-lg-8">
          <div class="event-info-box mb-4">
            <h4 class="mb-3"><i class="bi bi-file-text"></i> وصف الفعالية</h4>
            <p class="lead">${event.description}</p>
            <p>انضم إلينا في هذه الفعالية المميزة التي تهدف إلى تعزيز التفاعل الطلابي وتبادل الخبرات والمعارف. الفعالية مفتوحة لجميع طلاب الجامعة وتهدف إلى بناء مجتمع طلابي متماسك ومتعاون.</p>
            <p>تتضمن الفعالية العديد من الفقرات المتنوعة والأنشطة التفاعلية التي تضمن للجميع قضاء وقت ممتع ومفيد. لا تفوت هذه الفرصة للمشاركة والاستفادة.</p>
          </div>

          <!-- Small Image Gallery -->
          <div class="event-info-box mb-4">
            <h4 class="mb-3"><i class="bi bi-images"></i> معرض الصور</h4>
            <div class="row g-2 event-gallery">
              ${gallery.map(img => `
                <div class="col-4">
                  <img src="${img}" alt="صورة من الفعالية" class="img-fluid rounded-3" loading="lazy">
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-flex flex-wrap gap-3 mb-4">
            <button class="btn btn-primary-custom" data-bs-toggle="modal" data-bs-target="#registerModal">
              <i class="bi bi-check-circle"></i> سجل الآن
            </button>
            <button class="btn btn-secondary-custom" onclick="addToCalendar()">
              <i class="bi bi-calendar-plus"></i> أضف للتقويم
            </button>
            <button class="btn btn-outline-custom" onclick="shareEvent('${event.title}')">
              <i class="bi bi-share"></i> مشاركة
            </button>
          </div>
        </div>

        <!-- Sidebar Info -->
        <div class="col-lg-4">
          <div class="event-info-box mb-4">
            <h5 class="mb-3"><i class="bi bi-info-circle"></i> معلومات الفعالية</h5>
            <div class="event-info-item">
              <i class="bi bi-calendar3"></i>
              <div>
                <small class="text-muted d-block">التاريخ</small>
                <span>${formatDate(event.date)}</span>
              </div>
            </div>
            <div class="event-info-item">
              <i class="bi bi-clock"></i>
              <div>
                <small class="text-muted d-block">الوقت</small>
                <span>${event.time}</span>
              </div>
            </div>
            <div class="event-info-item">
              <i class="bi bi-geo-alt"></i>
              <div>
                <small class="text-muted d-block">المكان</small>
                <span>${event.location}</span>
              </div>
            </div>
            <div class="event-info-item">
              <i class="bi bi-tag"></i>
              <div>
                <small class="text-muted d-block">التصنيف</small>
                <span class="badge ${event.badgeClass}">${event.badge}</span>
              </div>
            </div>
          </div>

          <!-- Map Button -->
          <button class="btn btn-secondary-custom w-100 mb-4" data-bs-toggle="modal" data-bs-target="#mapModal">
            <i class="bi bi-map"></i> عرض الموقع على الخريطة
          </button>
        </div>
      </div>

      <!-- Related Events -->
      <div class="mt-5">
        <h3 class="mb-4"><i class="bi bi-link-45deg"></i> فعاليات ذات صلة</h3>
        <div class="row" id="relatedEvents"></div>
      </div>
    </div>
  `;

  // Load related events (same category, different id)
  const relatedContainer = document.getElementById('relatedEvents');
  if (relatedContainer) {
    const related = eventsData
      .filter(e => e.category === event.category && e.id !== event.id)
      .slice(0, 3);

    if (related.length === 0) {
      // If no same category, show any other events
      const otherEvents = eventsData.filter(e => e.id !== event.id).slice(0, 3);
      renderRelatedEvents(otherEvents, relatedContainer);
    } else {
      renderRelatedEvents(related, relatedContainer);
    }
  }

  // Update map location
  const mapFrame = document.getElementById('mapFrame');
  if (mapFrame) {
    // Using OpenStreetMap for the university location
    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=36.3%2C33.5%2C36.32%2C33.52&layer=mapnik&marker=33.51%2C36.31`;
  }

  // Update register modal event title
  const registerEventTitle = document.getElementById('registerEventTitle');
  if (registerEventTitle) {
    registerEventTitle.textContent = event.title;
  }
}

function renderRelatedEvents(events, container) {
  container.innerHTML = events.map(event => `
    <div class="col-md-4 mb-3 slide-up">
      <div class="card event-card h-100">
        <div class="card-img-wrapper">
          <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
        </div>
        <div class="card-body">
          <h5 class="card-title">${event.title}</h5>
          <div class="event-meta">
            <span><i class="bi bi-calendar3"></i> ${formatDate(event.date)}</span>
          </div>
          <a href="event.html?id=${event.id}" class="btn btn-primary-custom btn-sm">
            <i class="bi bi-info-circle"></i> التفاصيل
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 5. Contact Form Validation
// ============================================

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const alertContainer = document.getElementById('contactAlert');

    let isValid = true;
    let errors = [];

    // Name validation
    if (!nameInput.value.trim()) {
      isValid = false;
      errors.push('الرجاء إدخال الاسم');
      nameInput.classList.add('is-invalid');
    } else if (nameInput.value.trim().length < 3) {
      isValid = false;
      errors.push('الاسم يجب أن يكون 3 أحرف على الأقل');
      nameInput.classList.add('is-invalid');
    } else {
      nameInput.classList.remove('is-invalid');
      nameInput.classList.add('is-valid');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      isValid = false;
      errors.push('الرجاء إدخال البريد الإلكتروني');
      emailInput.classList.add('is-invalid');
    } else if (!emailRegex.test(emailInput.value.trim())) {
      isValid = false;
      errors.push('الرجاء إدخال بريد إلكتروني صحيح');
      emailInput.classList.add('is-invalid');
    } else {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
    }

    // Message validation
    if (!messageInput.value.trim()) {
      isValid = false;
      errors.push('الرجاء إدخال الرسالة');
      messageInput.classList.add('is-invalid');
    } else if (messageInput.value.trim().length < 10) {
      isValid = false;
      errors.push('الرسالة يجب أن تكون 10 أحرف على الأقل');
      messageInput.classList.add('is-invalid');
    } else {
      messageInput.classList.remove('is-invalid');
      messageInput.classList.add('is-valid');
    }

    // Show result
    if (!isValid) {
      showAlert('danger', '<strong>خطأ!</strong> ' + errors.join('<br>'));
    } else {
      showAlert('success', '<strong>تم الإرسال بنجاح!</strong> شكراً لتواصلك معنا، سنقوم بالرد عليك في أقرب وقت.');
      form.reset();
      nameInput.classList.remove('is-valid');
      emailInput.classList.remove('is-valid');
      messageInput.classList.remove('is-valid');
    }
  });
}

function showAlert(type, message) {
  const container = document.getElementById('contactAlert');
  if (!container) return;

  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';

  container.innerHTML = `
    <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
      <i class="bi ${icon}"></i> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  // Auto-dismiss success alerts
  if (type === 'success') {
    setTimeout(() => {
      const alert = container.querySelector('.alert');
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 5000);
  }
}

// ============================================
// 6. Registration Form Handler
// ============================================

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('regName');
    const emailInput = document.getElementById('regEmail');
    const phoneInput = document.getElementById('regPhone');

    // Simple validation
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    // Store registration in localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      event: document.getElementById('registerEventTitle').textContent,
      date: new Date().toISOString()
    });
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Show success and close modal
    alert('تم التسجيل بنجاح!');
    const modalEl = document.getElementById('registerModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();

    form.reset();
  });
}

// ============================================
// 7. Share Function
// ============================================

function shareEvent(title) {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: `تفقد هذه الفعالية: ${title}`,
      url: url
    }).catch(() => {});
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${title} - ${url}`).then(() => {
      alert('تم نسخ رابط الفعالية!');
    }).catch(() => {
      prompt('انسخ الرابط:', url);
    });
  }
}

// ============================================
// 7b. Add to Calendar (downloads an .ics file)
// ============================================

function addToCalendar() {
  const ev = window.currentEvent;
  if (!ev) return;

  // Build start/end timestamps (event assumed to last 2 hours)
  const datePart = ev.date.replace(/-/g, '');
  const startTime = ev.time.replace(':', '') + '00';
  const endHour = String((parseInt(ev.time.split(':')[0]) + 2) % 24).padStart(2, '0');
  const endTime = endHour + ev.time.split(':')[1] + '00';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//University Activities Guide//AR',
    'BEGIN:VEVENT',
    `SUMMARY:${ev.title}`,
    `DTSTART:${datePart}T${startTime}`,
    `DTEND:${datePart}T${endTime}`,
    `LOCATION:${ev.location}`,
    `DESCRIPTION:${ev.description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Trigger a download of the .ics file
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${ev.title}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================
// 8. Utility: Format Date
// ============================================

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// ============================================
// 9. Load Featured Events on Home Page
// ============================================

function loadFeaturedEvents() {
  const container = document.getElementById('featuredEvents');
  if (!container) return;

  // Show first 3 events as featured
  const featured = eventsData.slice(0, 3);

  container.innerHTML = featured.map(event => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card event-card h-100">
        <div class="card-img-wrapper">
          <img src="${event.image}" class="card-img-top" alt="${event.title}" loading="lazy">
          <span class="badge ${event.badgeClass} position-absolute top-0 end-0 m-2">${event.badge}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${event.title}</h5>
          <div class="event-meta">
            <span><i class="bi bi-calendar3"></i> ${formatDate(event.date)}</span>
            <span><i class="bi bi-geo-alt"></i> ${event.location}</span>
          </div>
          <p class="card-text flex-grow-1">${event.description.substring(0, 80)}...</p>
          <a href="event.html?id=${event.id}" class="btn btn-primary-custom mt-auto">
            <i class="bi bi-info-circle"></i> التفاصيل
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// 10. Load Weekly Events on Home Page
// ============================================

function loadWeeklyEvents() {
  const container = document.getElementById('weeklyEvents');
  if (!container) return;

  const weekly = eventsData.filter(e => e.category === 'weekly');

  container.innerHTML = weekly.map(event => `
    <div class="col-md-6 mb-3">
      <div class="d-flex align-items-center p-3 bg-white rounded-3 shadow-sm">
        <img src="${event.image}" class="rounded-3" style="width: 100px; height: 70px; object-fit: cover;" alt="${event.title}">
        <div class="me-3 flex-grow-1">
          <h6 class="mb-1">${event.title}</h6>
          <small class="text-muted"><i class="bi bi-calendar3"></i> ${formatDate(event.date)} | ${event.time}</small>
        </div>
        <a href="event.html?id=${event.id}" class="btn btn-sm btn-primary-custom">
          <i class="bi bi-arrow-left"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// ============================================
// 11. Navbar Active State
// ============================================

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ============================================
// Initialize Everything on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initScrollToTop();
  initEventFiltering();
  loadEventDetails();
  initContactForm();
  initRegisterForm();
  loadFeaturedEvents();
  loadWeeklyEvents();
  setActiveNav();
});
