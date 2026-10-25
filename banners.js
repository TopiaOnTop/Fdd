document.addEventListener('DOMContentLoaded', async function() {
    try {
        let banners = [];
        try {
            const res = await fetch('/banners.json');
            banners = await res.json();
        } catch (err) {
            const resApi = await fetch('/api/banners');
            banners = await resApi.json();
        }
        
        const bannerList1 = document.getElementById('banner-list-1');
        const bannerList2 = document.getElementById('banner-list-2');

        if (bannerList1) bannerList1.innerHTML = '';
        if (bannerList2) bannerList2.innerHTML = '';

        if (Array.isArray(banners) && banners.length > 0) {
            banners.forEach((b, idx) => {
                const pos = (b.position || 'top').toLowerCase();
                if (pos === 'popout') return; // Handled separately by popout banner logic

                let targetContainer = null;

                if (pos.startsWith('top')) {
                    targetContainer = bannerList1 || bannerList2;
                } else if (pos.startsWith('bottom')) {
                    targetContainer = bannerList2 || bannerList1;
                } else if (pos.includes('left')) {
                    targetContainer = bannerList1 || bannerList2;
                } else if (pos.includes('right')) {
                    targetContainer = bannerList2 || bannerList1;
                } else if (pos.startsWith('middle')) {
                    targetContainer = (idx % 2 === 0) ? (bannerList1 || bannerList2) : (bannerList2 || bannerList1);
                } else {
                    targetContainer = (idx % 2 === 0) ? (bannerList1 || bannerList2) : (bannerList2 || bannerList1);
                }

                if (!targetContainer) return;

                const clickUrl = b.url || `/api/banners/click/${b.id}`;
                const div = document.createElement('div');
                div.className = 'rounded-lg overflow-hidden cursor-pointer border border-gray-800/40 hover:border-blue-500/50 transition-all';
                div.innerHTML = `<div class="relative w-full h-16 flex items-center justify-center bg-slate-900/60"><img src="${b.img}" class="max-w-full max-h-full object-contain p-0"></div>`;
                div.addEventListener('click', () => window.open(clickUrl, '_blank'));
                targetContainer.appendChild(div);
            });

            // Handle popout banners
            initPopoutBanner(banners);
        }
    } catch (e) {
        console.error('Failed to load banners:', e);
    }
});

function initPopoutBanner(banners) {
    if (document.getElementById('adPopup')) return;

    const buyImage = '/buy.png';
    const buyUrl = 'https://t.me/dstatfyi';

    let popoutItems = banners.filter(b => (b.position || '').toLowerCase() === 'popout');
    if (popoutItems.length === 0) {
        popoutItems = [
            { id: 'default_popout', img: buyImage, url: buyUrl, claimed: false }
        ];
    } else {
        popoutItems = popoutItems.map(b => ({
            id: b.id,
            img: b.img,
            url: b.url || `/api/banners/click/${b.id}`,
            claimed: true
        }));
    }

    const popup = document.createElement('div');
    popup.id = 'adPopup';
    popup.innerHTML = `
        <div id="adPopupOverlay" style="position:fixed;inset:0;background:rgba(0,0,0,0.78);z-index:9998;display:none;opacity:0;transition:opacity 0.25s ease;"></div>
        <div id="adPopupBox" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.96);width:92%;max-width:400px;background:#0B0C16;border:1px solid #2A2E3F;border-radius:14px;box-shadow:0 25px 60px rgba(0,0,0,0.7);z-index:9999;display:none;opacity:0;transition:opacity 0.25s ease, transform 0.25s ease;overflow:hidden;max-height:88vh;overflow-y:auto;">
            <div style="padding:16px 18px 10px;text-align:center;border-bottom:1px solid #2A2E3F;">
                <div style="font-size:12px;font-weight:600;letter-spacing:0.14em;color:#9ca3af;text-transform:uppercase;">Advertisements</div>
            </div>
            <div id="adPopupList" style="padding:12px 14px;display:flex;flex-direction:column;gap:9px;"></div>
            <div style="padding:10px 18px 16px;text-align:center;border-top:1px solid #2A2E3F;">
                <button id="closeAdPopup" disabled style="background:transparent;border:1px solid #374151;color:#6b7280;padding:7px 26px;border-radius:8px;font-size:13px;cursor:not-allowed;transition:all 0.2s;min-width:110px;">Close (3s)</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    const list = document.getElementById('adPopupList');
    popoutItems.forEach(item => {
        const finalImg = item.img || buyImage;
        const finalUrl = item.url || buyUrl;
        const div = document.createElement('div');
        div.style.cssText = 'border-radius:9px;overflow:hidden;cursor:pointer;background:#111;line-height:0;';
        div.innerHTML = `<img src="${finalImg}" style="width:100%;height:62px;object-fit:cover;display:block;">`;
        div.addEventListener('click', () => window.open(finalUrl, '_blank'));
        list.appendChild(div);
    });

    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 86400000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let c of ca) {
            c = c.trim();
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }

    function closeAdPopup() {
        const box = document.getElementById('adPopupBox');
        const overlay = document.getElementById('adPopupOverlay');
        if (box) {
            box.style.opacity = '0';
            box.style.transform = 'translate(-50%,-50%) scale(0.96)';
        }
        if (overlay) {
            overlay.style.opacity = '0';
        }
        setTimeout(() => {
            if (box) box.style.display = 'none';
            if (overlay) overlay.style.display = 'none';
        }, 250);
        setCookie('dstat_ad_seen_time', Date.now().toString(), 365);
    }

    const lastSeenTime = parseInt(getCookie('dstat_ad_seen_time') || '0', 10);
    const fiveMinutesMs = 5 * 60 * 1000;

    if (!lastSeenTime || (Date.now() - lastSeenTime >= fiveMinutesMs)) {
        setTimeout(() => {
            const box = document.getElementById('adPopupBox');
            const overlay = document.getElementById('adPopupOverlay');
            const btn = document.getElementById('closeAdPopup');

            if (!box || !overlay || !btn) return;

            overlay.style.display = 'block';
            box.style.display = 'block';
            void box.offsetWidth;
            overlay.style.opacity = '1';
            box.style.opacity = '1';
            box.style.transform = 'translate(-50%,-50%) scale(1)';

            let seconds = 3;
            btn.textContent = `Close (${seconds}s)`;
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
            btn.style.color = '#6b7280';

            const timer = setInterval(() => {
                seconds--;
                if (seconds > 0) {
                    btn.textContent = `Close (${seconds}s)`;
                } else {
                    clearInterval(timer);
                    btn.textContent = 'Close';
                    btn.disabled = false;
                    btn.style.cursor = 'pointer';
                    btn.style.color = '#d1d5db';
                    btn.style.borderColor = '#4b5563';
                }
            }, 1000);

            btn.addEventListener('click', closeAdPopup);
            overlay.addEventListener('click', () => { if (!btn.disabled) closeAdPopup(); });
        }, 700);
    }
}
