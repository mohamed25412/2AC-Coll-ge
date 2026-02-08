// ============================================
// 2AC Collège - App Management Script
// ============================================

// App Version Information
const APP_VERSIONS = {
    android: "1.0.0",
    ios: "1.0.0",
    windows: "1.0.0"
};

const UPDATE_INFO = {
    android: {
        version: "1.0.0",
        downloadUrl: "./files/2AC_College.apk",
        changelog: "الإصدار الأول من التطبيق",
        fileSize: "25 MB",
        releaseDate: "2026-02-08"
    },
    ios: {
        version: "1.0.0",
        downloadUrl: "./files/2AC_College.ipa",
        changelog: "الإصدار الأول من التطبيق",
        fileSize: "30 MB",
        releaseDate: "2026-02-08"
    },
    windows: {
        version: "1.0.0",
        downloadUrl: "./files/2AC_College.exe",
        changelog: "الإصدار الأول من التطبيق",
        fileSize: "35 MB",
        releaseDate: "2026-02-08"
    }
};

// ============================================
// Mobile Menu Toggle
// ============================================

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Close mobile menu when link is clicked
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const navLinksContainer = document.getElementById('navLinks');
            if (navLinksContainer) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
});

// ============================================
// Platform Switching
// ============================================

function switchPlatform(platform) {
    // Hide all platform contents
    document.querySelectorAll('.platform-content').forEach(el => {
        el.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.platform-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected platform
    const platformElement = document.getElementById(platform);
    if (platformElement) {
        platformElement.classList.add('active');
    }

    // Add active class to clicked button
    event.target.closest('.platform-btn').classList.add('active');
}

// ============================================
// Download Functions
// ============================================

function copyDownloadLink(platform) {
    const url = UPDATE_INFO[platform].downloadUrl;
    const fullUrl = window.location.origin + '/' + url.replace('./', '');

    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast(`تم نسخ رابط التحميل للـ ${getPlatformName(platform)}`, 'success');
    }).catch(err => {
        showToast('خطأ في نسخ الرابط', 'error');
    });
}

function getPlatformName(platform) {
    const names = {
        android: 'Android',
        ios: 'iOS',
        windows: 'Windows'
    };
    return names[platform] || platform;
}

function scrollToDownload() {
    const downloadSection = document.getElementById('download');
    if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// Notification Toast
// ============================================

function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// ============================================
// API Endpoint for App Update Check
// ============================================

function checkForUpdates(platform, currentVersion) {
    // Validate platform
    if (!UPDATE_INFO[platform]) {
        return {
            success: false,
            message: "منصة غير معروفة"
        };
    }

    const latestVersion = UPDATE_INFO[platform].version;
    const isUpdateAvailable = compareVersions(currentVersion, latestVersion) < 0;

    return {
        success: true,
        isUpdateAvailable: isUpdateAvailable,
        currentVersion: currentVersion,
        latestVersion: latestVersion,
        downloadUrl: UPDATE_INFO[platform].downloadUrl,
        fileSize: UPDATE_INFO[platform].fileSize,
        changelog: UPDATE_INFO[platform].changelog,
        releaseDate: UPDATE_INFO[platform].releaseDate,
        message: isUpdateAvailable ? "تحديث جديد متاح" : "أنت تستخدم آخر إصدار"
    };
}

// ============================================
// Version Comparison
// ============================================

function compareVersions(version1, version2) {
    const v1parts = version1.split('.').map(Number);
    const v2parts = version2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
        const v1 = v1parts[i] || 0;
        const v2 = v2parts[i] || 0;

        if (v1 < v2) return -1;
        if (v1 > v2) return 1;
    }

    return 0;
}

// ============================================
// Initialize Page
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Update version display
    updateVersionDisplay();

    // Setup navigation
    setupNavigation();

    // Initialize platform selector
    initializePlatforms();

    console.log('2AC Collège Platform Initialized');
});

function updateVersionDisplay() {
    const elements = {
        'current-version': APP_VERSIONS.android,
        'android-version': APP_VERSIONS.android,
        'ios-version': APP_VERSIONS.ios,
        'windows-version': APP_VERSIONS.windows
    };

    Object.keys(elements).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = elements[id];
        }
    });
}

function setupNavigation() {
    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializePlatforms() {
    // Show Android by default
    const androidElement = document.getElementById('android');
    if (androidElement) {
        androidElement.classList.add('active');
    }

    const firstPlatformBtn = document.querySelector('.platform-btn');
    if (firstPlatformBtn) {
        firstPlatformBtn.classList.add('active');
    }
}

// ============================================
// Example: Check Update from App
// ============================================

function testUpdateCheck() {
    const result = checkForUpdates('android', '0.9.5');
    console.log('Update Check Result:', result);

    if (result.isUpdateAvailable) {
        showToast(`تحديث جديد متاح: ${result.latestVersion}`, 'success');
    }

    return result;
}

// ============================================
// Utility Functions
// ============================================

function getDownloadInfo(platform) {
    return UPDATE_INFO[platform] || null;
}

function getAvailablePlatforms() {
    return Object.keys(UPDATE_INFO);
}

function logVersionInfo() {
    console.log('=== 2AC Collège Version Info ===');
    Object.keys(UPDATE_INFO).forEach(platform => {
        const info = UPDATE_INFO[platform];
        console.log(`${platform.toUpperCase()}: v${info.version} - ${info.fileSize}`);
    });
}

// ============================================
// Export Functions for External Use
// ============================================

window.checkForUpdates = checkForUpdates;
window.compareVersions = compareVersions;
window.getDownloadInfo = getDownloadInfo;
window.getAvailablePlatforms = getAvailablePlatforms;
window.logVersionInfo = logVersionInfo;
window.testUpdateCheck = testUpdateCheck;
window.switchPlatform = switchPlatform;
window.copyDownloadLink = copyDownloadLink;
window.scrollToDownload = scrollToDownload;
window.toggleMobileMenu = toggleMobileMenu;
window.showToast = showToast;

