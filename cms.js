/* Memuat konten dari Supabase (dikelola lewat web-admin) dan menimpa konten statis. */
(function () {
  var C = window.CMS_CONFIG || {}, store = null;
  var ICONS = {"i1": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"></line><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"></path></svg>", "i2": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"></ellipse><path d=\"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5\"></path><path d=\"M3 12c0 1.66 4 3 9 3s9-1.34 9-3\"></path></svg>", "i3": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 21h18\"></path><path d=\"M5 21V9l7-5 7 5v12\"></path><path d=\"M9 21v-6h6v6\"></path><line x1=\"9\" y1=\"12\" x2=\"9\" y2=\"12.01\"></line><line x1=\"15\" y1=\"12\" x2=\"15\" y2=\"12.01\"></line></svg>", "i4": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z\"></path><circle cx=\"12\" cy=\"13\" r=\"4\"></circle></svg>", "i5": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 20h9\"></path><path d=\"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z\"></path></svg>", "i6": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z\"></path></svg>", "i7": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"></path><polyline points=\"9 22 9 12 15 12 15 22\"></polyline></svg>", "i8": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><line x1=\"3\" y1=\"22\" x2=\"21\" y2=\"22\"></line><line x1=\"6\" y1=\"18\" x2=\"6\" y2=\"11\"></line><line x1=\"10\" y1=\"18\" x2=\"10\" y2=\"11\"></line><line x1=\"14\" y1=\"18\" x2=\"14\" y2=\"11\"></line><line x1=\"18\" y1=\"18\" x2=\"18\" y2=\"11\"></line><polygon points=\"12 2 21 7 3 7 12 2\"></polygon></svg>", "i9": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 22V4a1 1 0 0 1 1-1h9l6 6v13\"></path><path d=\"M14 3v6h6\"></path><line x1=\"8\" y1=\"13\" x2=\"16\" y2=\"13\"></line><line x1=\"8\" y1=\"17\" x2=\"16\" y2=\"17\"></line></svg>", "i10": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"12 2 2 7 12 12 22 7 12 2\"></polygon><polyline points=\"2 17 12 22 22 17\"></polyline><polyline points=\"2 12 12 17 22 12\"></polyline></svg>", "i11": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle></svg>", "i12": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"></path><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"></path></svg>", "i13": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z\"></path></svg>", "i14": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z\"></path></svg>", "i15": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"></path></svg>", "i16": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"></path><polyline points=\"14 2 14 8 20 8\"></polyline><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"></line><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"></line></svg>", "i17": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"></path></svg>", "i18": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg>", "i19": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"></path></svg>", "i20": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z\"></path><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"></line><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"></line></svg>"};
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
  function safeUrl(u) { u = String(u || '').trim(); return /^(https?:\/\/|mailto:|tel:)/i.test(u) ? u : '#'; }
  var META = {
    posyandu:      { t: 'Posyandu',      l: ['Lokasi', 'Pengelola', 'Tempat Kegiatan'] },
    sekolah_dasar: { t: 'Sekolah Dasar', l: ['Alamat', 'Naungan'] },
    paud:          { t: 'PAUD',          l: ['Alamat', 'Naungan'] },
    umkm:          { t: 'UMKM',          l: ['Alamat', 'Keterangan'] },
    sma_smk:       { t: 'SMA/SMK',       l: ['Alamat', 'Naungan'] },
    kelompok_tani: { t: 'Kelompok Tani', l: ['Alamat', 'Keterangan'] }
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  window.CMS = { esc: esc, get: function (k) { return store && store[k] && store[k].length ? store[k] : null; } };

  window.CMS_READY = (C.url && C.key)
    ? fetch(C.url.replace(/\/$/, '') + '/rest/v1/konten?select=koleksi,data&order=urutan.asc,id.asc',
        { headers: { apikey: C.key, Authorization: 'Bearer ' + C.key }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (rows) { store = {}; rows.forEach(function (r) { (store[r.koleksi] = store[r.koleksi] || []).push(r.data); }); })
      .catch(function () { store = null; })
    : Promise.resolve();

  function apply() {
    var ld = CMS.get('layanan_digital'), cg = document.getElementById('cardsGrid');
    if (ld && cg) {
      cg.innerHTML = ld.map(function (x) {
        return '<a href="' + esc(safeUrl(x.url)) + '" class="service-card in-view" target="_blank" rel="noopener noreferrer"><div class="card-icon">' +
          (ICONS[x.ikon] || ICONS.i1) + '</div><div class="card-title">' + esc(x.judul) + '</div><div class="card-desc">' + esc(x.deskripsi) +
          '</div><div class="card-arrow-row"><div class="card-arrow">' + ARROW + '</div></div></a>';
      }).join('');
    }

    var s = CMS.get('statistik'), tr = document.getElementById('popTrack');
    if (s && tr) {
      var old = [].map.call(tr.querySelectorAll('.pop-item'), function (e) {
        var ic = e.querySelector('.pop-icon');
        return { label: e.querySelector('.pop-label').textContent, icon: ic.innerHTML, cls: ic.className.replace('pop-icon', '').trim() };
      });
      tr.innerHTML = s.map(function (x, i) {
        var o = old.filter(function (q) { return q.label === x.label; })[0] || old[i % (old.length || 1)] || { icon: '', cls: 'c1' };
        return '<div class="pop-item"><div class="pop-icon ' + o.cls + '">' + o.icon + '</div><div class="pop-value">' +
          Number(x.jumlah || 0).toLocaleString('id-ID') + '</div><div class="pop-unit">Orang</div><div class="pop-label">' + esc(x.label) + '</div></div>';
      }).join('');
      var vp = document.getElementById('popViewport'); if (vp) vp.dispatchEvent(new Event('scroll'));
    }

    var n = CMS.get('nomor_penting'), g = document.querySelector('.contact-grid');
    if (n && g) {
      var ics = [].map.call(g.querySelectorAll('.ic'), function (e) { return e.innerHTML; });
      g.innerHTML = n.map(function (x, i) {
        return '<div class="contact-card in-view"><div class="ic">' + (ics[i % (ics.length || 1)] || '') + '</div><div><div class="name">' +
          esc(x.nama) + '</div><div class="num">' + esc(x.nomor) + '</div></div></div>';
      }).join('');
    }

    var sec = document.querySelector('[data-cms]');
    if (sec && META[sec.getAttribute('data-cms')]) {
      var key = sec.getAttribute('data-cms'), m = META[key], list = (store && store[key]) || [];
      var ic = sec.querySelector('.card-icon,.pe-icon'), icon = ic ? ic.innerHTML : '';
      var back = sec.querySelector('.prasarana-back-row'), backHtml = back ? back.outerHTML : '';
      var body;
      if (!list.length) {
        body = '<div class="prasarana-empty"><div class="pe-icon">' + icon + '</div><h3>Data ' + esc(m.t) +
          '</h3><p>Data belum tersedia. Informasi akan diperbarui setelah data resmi dari kelurahan tersedia.</p></div>';
      } else {
        body = '<div class="prasarana-count">Jumlah ' + esc(m.t) + ': ' + list.length + '</div><div class="prasarana-data-grid">' +
          list.map(function (x) {
            var rows = m.l.map(function (lb, i) {
              var v = x['f' + (i + 1)];
              return v ? '<div class="prasarana-row"><span class="lbl">' + esc(lb) + '</span><span class="val">' + esc(v) + '</span></div>' : '';
            }).join('');
            return '<div class="prasarana-data-card"><div class="card-icon">' + icon + '</div><div class="pdc-title">' + esc(x.nama) + '</div>' + rows + '</div>';
          }).join('') + '</div>';
      }
      sec.innerHTML = body + backHtml;
    }
  }
  window.CMS_READY.then(function () {
    if (!store) return;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  });
})();
