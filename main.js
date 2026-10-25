let activeInterval = null;
let currentLayer = 'layer4';
let currentSid = null;
let cachedServers = null;

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    
    try {
        cachedServers = await fetch('/api/servers').then(r => r.json());
        
        // Initial parse
        parseUrlAndSwitch();

        renderServers(cachedServers, currentLayer);

        document.querySelectorAll('.layer-button').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var c = btn.nextElementSibling;
                var i = btn.querySelector('.rotate-icon');
                var o = c.style.maxHeight && c.style.maxHeight !== '0px';
                c.style.maxHeight = o ? '0px' : '600px';
                c.style.opacity = o ? '0' : '1';
                if(i) i.classList.toggle('open');
            });
        });
        document.querySelectorAll('.category-button').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var c = btn.nextElementSibling;
                var i = btn.querySelector('.rotate-icon');
                var o = c.style.maxHeight && c.style.maxHeight !== '0px';
                c.style.maxHeight = o ? '0px' : '600px';
                c.style.opacity = o ? '0' : '1';
                if(i) i.classList.toggle('open');
            });
        });

        window.addEventListener('popstate', () => {
            parseUrlAndSwitch();
        });

    } catch(e) {
        console.error('main.js error:', e);
    } finally {
        if (loader) loader.classList.add('hidden');
    }
});

function parseUrlAndSwitch() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedServerId = urlParams.get('id');

    // Support both old path-based routes (redirected via 404.html) and query-param routes
    const path = window.location.pathname;
    const isLayer7Route = 
        path === '/l7' || path === '/layer7' ||
        urlParams.has('l7') || 
        urlParams.get('layer') === 'layer7';
    
    const layer = isLayer7Route ? 'layer7' : 'layer4';

    window.switchActiveServer(layer, selectedServerId);
}

window.switchActiveServer = async function(layer, serverId) {
    currentLayer = layer;
    if (!cachedServers) return;

    const serversLayer = cachedServers[layer] || {};

    let selectedServer = null;
    let activeServerKey = null;

    if (serverId) {
        for (const cat of Object.values(serversLayer)) {
            if (cat.servers) {
                for (const [sKey, sVal] of Object.entries(cat.servers)) {
                    if (sKey.toLowerCase() === serverId.toLowerCase() || sVal.name.toLowerCase() === serverId.toLowerCase()) {
                        selectedServer = sVal;
                        activeServerKey = sKey;
                        break;
                    }
                }
            }
            if (selectedServer) break;
        }
    }
    if (!selectedServer) {
        for (const cat of Object.values(serversLayer)) {
            for (const [sKey, sVal] of Object.entries(cat.servers || {})) {
                selectedServer = sVal;
                activeServerKey = sKey;
                break;
            }
            if (selectedServer) break;
        }
    }
    if (!selectedServer) {
        selectedServer = (layer === 'layer7')
            ? { name: 'FDCServer', ip: 'https://50.7.24.51/', ports: '443', bandwidth: '2M' }
            : { name: 'Latitude', ip: '152.236.39.20', ports: '22 & 80', bandwidth: '200 Gbps' };
        activeServerKey = (layer === 'layer7') ? 'FDCServer' : 'Latitude';
    }

    currentSid = activeServerKey;

    renderGraphDetails(selectedServer);

    const chartRes = await fetch(`/api/${layer}/${currentSid}`).then(r => r.json()).catch(() => ({ bandwidth: Array(50).fill(0), packets: Array(50).fill(0) }));
    createChart({
        bandwidth: (chartRes.bandwidth || []).map(Number),
        packets: (chartRes.packets || []).map(Number)
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();

    if (activeInterval) clearInterval(activeInterval);
    activeInterval = setInterval(() => updateChart(currentLayer, currentSid), 1500);
};
