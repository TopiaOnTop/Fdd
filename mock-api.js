(function() {
    console.log('[MockAPI] Initializing frontend API interception...');

    const initialServers = {
        "layer4": {
            "massive": {
                "category_name": "Massive",
                "servers": {
                    "Latitude": {
                        "id": 3, "layer": "layer4", "category_id": "massive", "category_name": "Massive",
                        "skey": "Latitude", "name": "Latitude", "flag": "https://flagcdn.com/w20/us.png",
                        "number": "04", "ip": "152.236.39.20", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "200 Gbps", "location": "US"
                    },
                    "Stelia": {
                        "id": 4, "layer": "layer4", "category_id": "massive", "category_name": "Massive",
                        "skey": "Stelia", "name": "Stelia", "flag": "https://flagcdn.com/w20/us.png",
                        "number": "07", "ip": "185.165.50.30", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "100 Gbps", "location": "US"
                    },
                    "LoadProxy": {
                        "id": 11, "layer": "layer4", "category_id": "massive", "category_name": "Massive",
                        "skey": "LoadProxy", "name": "LoadProxy", "flag": "https://flagcdn.com/w20/nl.png",
                        "number": "01", "ip": "185.211.78.67", "port": "8787", "ports": "22 & 80",
                        "bandwidth": "20 Tbps", "location": "NL"
                    },
                    "G-Core": {
                        "id": 12, "layer": "layer4", "category_id": "massive", "category_name": "Massive",
                        "skey": "G-Core", "name": "G-Core", "flag": "https://flagcdn.com/w20/lu.png",
                        "number": "01", "ip": "202.78.161.128", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "200 Gbps", "location": "LU"
                    },
                    "Telecom": {
                        "id": 13, "layer": "layer4", "category_id": "massive", "category_name": "Massive",
                        "skey": "Telecom", "name": "Telecom", "flag": "https://flagcdn.com/w20/ar.png",
                        "number": "02", "ip": "181.12.36.114", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "200 Gbps", "location": "AR"
                    }
                }
            },
            "protected": {
                "category_name": "Protected",
                "servers": {
                    "OVH": {
                        "id": 5, "layer": "layer4", "category_id": "protected", "category_name": "Protected",
                        "skey": "OVH", "name": "OVH", "flag": "https://flagcdn.com/w20/fr.png",
                        "number": "02", "ip": "15.235.228.127", "port": "9100", "ports": "22 & 53",
                        "bandwidth": "50 Gbps", "location": "FR"
                    },
                    "Datacamp": {
                        "id": 16, "layer": "layer4", "category_id": "protected", "category_name": "Protected",
                        "skey": "datacamp", "name": "Datacamp", "flag": "https://flagcdn.com/w20/us.png",
                        "number": "01", "ip": "152.233.30.18", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "100 Gbps", "location": "US"
                    },
                    "DDoS-Guard": {
                        "id": 18, "layer": "layer4", "category_id": "protected", "category_name": "Protected",
                        "skey": "DDos-Guard", "name": "DDoS-Guard", "flag": "https://flagcdn.com/w20/ru.png",
                        "number": "03", "ip": "95.129.234.37", "port": "9100", "ports": "22 & 53",
                        "bandwidth": "10 Gbps", "location": "RU"
                    },
                    "DataPacket": {
                        "id": 3351, "layer": "layer4", "category_id": "protected", "category_name": "Protected",
                        "skey": "data-packet", "name": "DataPacket", "flag": "https://flagcdn.com/w20/de.png",
                        "number": "01", "ip": "45.136.153.207", "port": "9100", "ports": "22 & 80",
                        "bandwidth": "80 Gbps", "location": "US"
                    }
                }
            },
            "non-protected": {
                "category_name": "Non Protected",
                "servers": {
                    "Lumen": {
                        "id": 6, "layer": "layer4", "category_id": "non-protected", "category_name": "Non Protected",
                        "skey": "Lumen", "name": "Lumen", "flag": "https://flagcdn.com/w20/us.png",
                        "number": "01", "ip": "216.202.170.56", "port": "9100", "ports": "22 & 53",
                        "bandwidth": "50 Gbps", "location": "USA"
                    },
                    "GlobalNet": {
                        "id": 7, "layer": "layer4", "category_id": "non-protected", "category_name": "Non Protected",
                        "skey": "GlobalNet", "name": "GlobalNet", "flag": "https://flagcdn.com/w20/nl.png",
                        "number": "02", "ip": "95.161.128.10", "port": "9100", "ports": "22 & 53",
                        "bandwidth": "40 Gbps", "location": "NL"
                    }
                }
            }
        },
        "layer7": {
            "massive": {
                "category_name": "L7 Massive",
                "servers": {
                    "FDCServer": {
                        "id": 8, "layer": "layer7", "category_id": "massive", "category_name": "L7 Massive",
                        "skey": "FDCServer", "name": "FDCServer", "flag": "https://flagcdn.com/w20/us.png",
                        "number": "01", "ip": "https://50.7.24.51/", "port": "443", "ports": "443",
                        "bandwidth": "2M", "location": "USA"
                    }
                }
            },
            "protected": {
                "category_name": "L7 Protected",
                "servers": {
                    "CF [UAM]": {
                        "id": 9, "layer": "layer7", "category_id": "protected", "category_name": "L7 Protected",
                        "skey": "CF [UAM]", "name": "CF [UAM]", "flag": "https://flagcdn.com/w20/ca.png",
                        "number": "01", "ip": "uam.nigglet.fun", "port": "80", "ports": "80 & 443",
                        "bandwidth": "250K", "location": "Canada"
                    },
                    "vShield": {
                        "id": 10, "layer": "layer7", "category_id": "protected", "category_name": "L7 Protected",
                        "skey": "vShield", "name": "vShield", "flag": "https://flagcdn.com/w20/ca.png",
                        "number": "02", "ip": "graph.vshield.pro", "port": "443", "ports": "443",
                        "bandwidth": "500K", "location": "Canada"
                    }
                }
            }
        }
    };

    const initialReviews = [
        {
            "id": "1787901918405",
            "name": "Typhon Botnet",
            "description": "Best Stresser, leader of the market - Up to 7.5 Tb/s and over 20M rq/s.",
            "url": "https://t.me/join_typhon",
            "layer4": 5,
            "layer7": 5,
            "status": "leader"
        }
    ];

    function getStoredData(key, defaultVal) {
        try {
            const raw = localStorage.getItem('dstat_mock_' + key);
            return raw ? JSON.parse(raw) : defaultVal;
        } catch(e) {
            return defaultVal;
        }
    }

    let serversState = getStoredData('servers', initialServers);
    let reviewsState = getStoredData('reviews', initialReviews);
    let bannersState = null;

    async function loadBannersConfig() {
        if (!bannersState) {
            try {
                const res = await originalFetch('/banners.json');
                bannersState = await res.json();
            } catch(e) {
                bannersState = [
                    { "id": "ban_top_1", "place": "Top Header Banner 1", "img": "/elitenetwork.gif", "position": "top", "url": "https://elitestress.st" },
                    { "id": "ban_pop_1", "place": "Popout Modal Banner 1", "img": "/vahn.gif", "position": "popout", "url": "https://t.me/dstatfyi" }
                ];
            }
        }
        return bannersState;
    }

    // Chart metrics history cache avec des offsets uniques par serveur
    const metricsHistory = {};

    function generateNextMetrics(key, isL7) {
        if (!metricsHistory[key]) {
            const points = 50;
            const bw = [];
            const pk = [];
            
            // Génération de graines et multiplicateurs uniques basés sur les caractères du nom du serveur (key)
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = (hash << 5) - hash + key.charCodeAt(i);
                hash |= 0;
            }
            const uniqueSeed = Math.abs(hash) % 1000;
            
            // Baseline range unique par serveur
            const baseBw = isL7 
                ? (uniqueSeed % 180000) + 80000 
                : (uniqueSeed % 35) + 10;
            const basePk = isL7 ? 0 : baseBw * (0.5 + (uniqueSeed % 40) / 100);

            for (let i = 0; i < points; i++) {
                const noise = (Math.sin(i * 0.3 + uniqueSeed) + (Math.random() - 0.5) * 0.5);
                bw.push(Math.max(0.1, baseBw + noise * (baseBw * 0.2)));
                pk.push(Math.max(0.1, basePk + noise * (basePk * 0.2)));
            }
            metricsHistory[key] = { bandwidth: bw, packets: pk, step: points, seed: uniqueSeed };
        } else {
            const h = metricsHistory[key];
            h.step += 1;
            const baseBw = h.bandwidth[h.bandwidth.length - 1];
            const basePk = isL7 ? 0 : h.packets[h.packets.length - 1];

            // Variation organique unique basée sur le pas et la seed du serveur
            const delta = Math.sin(h.step * 0.25 + h.seed) * (isL7 ? 12000 : 1.0) + (Math.random() - 0.5) * (isL7 ? 6000 : 0.5);
            const nextBw = Math.max(isL7 ? 30000 : 1, baseBw + delta);
            const nextPk = isL7 ? 0 : Math.max(1, nextBw * (0.6 + Math.random() * 0.2));

            h.bandwidth.shift();
            h.bandwidth.push(nextBw);
            h.packets.shift();
            h.packets.push(nextPk);
        }
        return metricsHistory[key];
    }

    const originalFetch = window.fetch;

    window.fetch = async function(input, init) {
        let url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
        const method = (init && init.method ? init.method : 'GET').toUpperCase();

        if (typeof url !== 'string') {
            url = String(url);
        }

        const cleanUrl = url.replace(/^(?:\/\/|[^\/]+)*\//, '/');

        const jsonResponse = (data, status = 200) => {
            return new Response(JSON.stringify(data), {
                status: status,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        // 1. Banners API
        if (cleanUrl.startsWith('/api/banners')) {
            await loadBannersConfig();

            if (cleanUrl === '/api/banners' || cleanUrl.startsWith('/api/banners?')) {
                return jsonResponse(bannersState);
            }

            if (cleanUrl.startsWith('/api/banners/click/')) {
                const bannerId = cleanUrl.split('/api/banners/click/')[1];
                const ban = bannersState.find(b => b.id === bannerId);
                const targetUrl = ban ? ban.url : 'https://t.me/dstatfyi';
                return Response.redirect(targetUrl, 302);
            }
        }

        // 2. Servers API
        if (cleanUrl === '/api/servers' || cleanUrl.startsWith('/api/servers?')) {
            return jsonResponse(serversState);
        }

        // 3. Layer4 / Layer7 Server Live Chart Metrics
        const l4Match = cleanUrl.match(/\/api\/layer4\/([^\/]+)/);
        if (l4Match) {
            const serverKey = decodeURIComponent(l4Match[1]);
            const metrics = generateNextMetrics('l4_' + serverKey, false);
            return jsonResponse(metrics);
        }

        const l7Match = cleanUrl.match(/\/api\/layer7\/([^\/]+)/);
        if (l7Match) {
            const serverKey = decodeURIComponent(l7Match[1]);
            const metrics = generateNextMetrics('l7_' + serverKey, true);
            return jsonResponse(metrics);
        }

        // 4. Reviews API
        if (cleanUrl.startsWith('/api/reviews')) {
            return jsonResponse(reviewsState);
        }

        return originalFetch(input, init);
    };
})();
