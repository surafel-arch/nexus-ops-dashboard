<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Nexus Health Solutions</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0d1117;--bg2:#161b25;--bg3:#1c2333;--bg4:#232d42;--bg5:#2a3650;
  --border:#1e2d45;--border2:#2d4060;
  --text:#c9d1d9;--text2:#8b949e;--text3:#484f58;
  --blue:#58a6ff;--blue-d:#1f6feb;--blue-bg:rgba(31,111,235,.15);
  --green:#3fb950;--green-bg:rgba(63,185,80,.15);
  --amber:#d29922;--amber-bg:rgba(210,153,34,.15);
  --red:#f85149;--red-bg:rgba(248,81,73,.15);
  --purple:#bc8cff;--purple-bg:rgba(188,140,255,.15);
  --cyan:#76e3ea;--cyan-bg:rgba(118,227,234,.15);
  --r:8px;--rl:12px;
}
body{background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;line-height:1.5;display:flex;height:100vh;overflow:hidden}
/* SIDEBAR */
#sb{width:220px;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto;transition:width .2s}
#sb.collapsed{width:48px}
.logo{padding:12px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;white-space:nowrap;overflow:hidden}
.logo-mark{width:26px;height:26px;background:var(--blue-d);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;flex-shrink:0}
.logo-text{font-size:11px;font-weight:700;line-height:1.2}
.logo-sub{font-size:9px;color:var(--text3);letter-spacing:.4px}
.nsec{padding:8px 6px 2px;overflow:hidden}
.nl{font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;padding:0 8px;margin-bottom:2px;white-space:nowrap;overflow:hidden}
.ni{display:flex;align-items:center;gap:7px;padding:6px 8px;border-radius:6px;cursor:pointer;color:var(--text2);font-size:12px;transition:all .1s;position:relative;white-space:nowrap;overflow:hidden}
.ni:hover{background:var(--bg3);color:var(--text)}
.ni.act{background:var(--blue-bg);color:var(--blue)}
.ni.act::before{content:'';position:absolute;left:0;top:4px;bottom:4px;width:2px;background:var(--blue);border-radius:0 2px 2px 0}
.ni i{font-size:14px;flex-shrink:0}
.ni .nbadge{margin-left:auto;background:var(--red);color:#fff;font-size:9px;padding:1px 5px;border-radius:8px;font-weight:700;flex-shrink:0}
/* MAIN */
#main{flex:1;display:flex;flex-direction:column;overflow:hidden}
#topbar{height:48px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 14px;gap:8px;flex-shrink:0}
.tb-toggle{background:none;border:none;color:var(--text2);cursor:pointer;font-size:16px;padding:4px;border-radius:4px}
.tb-toggle:hover{background:var(--bg3);color:var(--text)}
.breadcrumb{font-size:12px;color:var(--text2);display:flex;align-items:center;gap:4px;flex:1}
.breadcrumb .crumb{cursor:pointer;color:var(--text2)}
.breadcrumb .crumb:hover{color:var(--blue)}
.breadcrumb .sep{color:var(--text3)}
.breadcrumb .current{color:var(--text);font-weight:500}
.gs-wrap{position:relative;width:260px}
.gs-wrap input{width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:5px 10px 5px 30px;border-radius:6px;font-size:12px;outline:none}
.gs-wrap input:focus{border-color:var(--blue)}
.gs-wrap i{position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:14px;pointer-events:none}
#search-results{position:absolute;top:100%;left:0;right:0;background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r);margin-top:4px;max-height:280px;overflow-y:auto;z-index:500;display:none}
#search-results.open{display:block}
.sr-item{padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border)}
.sr-item:last-child{border-bottom:none}
.sr-item:hover{background:var(--bg3)}
.sr-type{font-size:9px;padding:2px 6px;border-radius:8px;font-weight:600}
/* CONTENT */
#content{flex:1;overflow-y:auto;padding:0}
.view{display:none;padding:16px}
.view.act{display:block}
/* CARDS */
.card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--rl);padding:14px;margin-bottom:12px}
.card-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
.card-title{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.5px}
/* KPI */
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:14px}
.kpi{background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);padding:12px 14px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden;user-select:none}
.kpi:hover{border-color:var(--border2);transform:translateY(-1px)}
.kpi:active{transform:translateY(0)}
.kpi-accent{position:absolute;top:0;left:0;width:100%;height:2px}
.kpi-label{font-size:10px;color:var(--text3);margin-bottom:4px}
.kpi-val{font-size:24px;font-weight:700;line-height:1;color:var(--text)}
.kpi-sub{font-size:10px;color:var(--text3);margin-top:3px}
.kpi-delta{font-size:10px;margin-top:2px}
.kpi-delta.up{color:var(--green)}
.kpi-delta.dn{color:var(--red)}
/* GRID */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.g23{display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:12px}
.g32{display:grid;grid-template-columns:1fr 1.6fr;gap:12px;margin-bottom:12px}
/* TABLE */
.tbl-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:12px}
thead th{text-align:left;padding:7px 10px;color:var(--text3);font-size:10px;text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border);font-weight:500;white-space:nowrap;cursor:pointer;user-select:none;position:sticky;top:0;background:var(--bg2)}
thead th:hover{color:var(--text2)}
thead th .sort-icon{margin-left:4px;opacity:.4}
thead th.sorted .sort-icon{opacity:1;color:var(--blue)}
td{padding:8px 10px;border-bottom:1px solid var(--border);vertical-align:middle}
tr:last-child td{border-bottom:none}
tbody tr{cursor:pointer;transition:background .08s}
tbody tr:hover td{background:rgba(255,255,255,.025)}
.row-actions{display:flex;gap:4px;justify-content:flex-end;opacity:0;transition:opacity .1s}
tbody tr:hover .row-actions{opacity:1}
/* BADGES */
.badge{display:inline-flex;align-items:center;padding:2px 7px;border-radius:10px;font-size:10px;font-weight:500;white-space:nowrap}
.bg{background:var(--green-bg);color:var(--green)}
.bb{background:var(--blue-bg);color:var(--blue)}
.br{background:var(--red-bg);color:var(--red)}
.ba{background:var(--amber-bg);color:var(--amber)}
.bp{background:var(--purple-bg);color:var(--purple)}
.bc{background:var(--cyan-bg);color:var(--cyan)}
.b3{background:var(--bg4);color:var(--text2);border:1px solid var(--border)}
/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:6px;border:1px solid var(--border2);background:var(--bg3);color:var(--text);font-size:11px;cursor:pointer;transition:all .1s;white-space:nowrap}
.btn:hover{background:var(--bg4)}
.btn:active{transform:scale(.98)}
.btn-primary{background:var(--blue-d);border-color:var(--blue-d);color:#fff}
.btn-primary:hover{background:#1a7ff0}
.btn-danger{background:var(--red-bg);border-color:rgba(248,81,73,.3);color:var(--red)}
.btn-danger:hover{background:rgba(248,81,73,.25)}
.btn-ghost{background:transparent;border-color:transparent;color:var(--text2)}
.btn-ghost:hover{background:var(--bg3);color:var(--text)}
.btn-sm{padding:3px 7px;font-size:11px}
.btn-xs{padding:2px 5px;font-size:10px}
/* FILTER BAR */
.filter-bar{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;align-items:center}
.filter-bar input,.filter-bar select{background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:5px 8px;border-radius:6px;font-size:11px;outline:none;transition:border-color .1s}
.filter-bar input:focus,.filter-bar select:focus{border-color:var(--blue)}
/* PAGINATION */
.pagination{display:flex;align-items:center;gap:4px;padding:10px 0 0;justify-content:flex-end}
.pag-btn{min-width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:5px;border:1px solid var(--border);background:var(--bg3);color:var(--text2);cursor:pointer;font-size:11px;transition:all .1s}
.pag-btn:hover{background:var(--bg4);color:var(--text)}
.pag-btn.act{background:var(--blue-d);border-color:var(--blue-d);color:#fff}
.pag-info{font-size:10px;color:var(--text3);margin-right:8px}
/* SCORE */
.score-bar{height:5px;border-radius:3px;background:var(--bg5);overflow:hidden}
.score-fill{height:100%;border-radius:3px;transition:width .4s ease}
.score-ring{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:2px solid;flex-shrink:0}
.sr-green{color:var(--green);border-color:var(--green);background:var(--green-bg)}
.sr-amber{color:var(--amber);border-color:var(--amber);background:var(--amber-bg)}
.sr-red{color:var(--red);border-color:var(--red);background:var(--red-bg)}
.risk-pill{display:inline-flex;align-items:center;gap:3px;padding:2px 7px;border-radius:10px;font-size:10px;font-weight:600}
.rp-stable{background:var(--green-bg);color:var(--green)}
.rp-warning{background:var(--amber-bg);color:var(--amber)}
.rp-critical{background:var(--red-bg);color:var(--red)}
/* MODAL */
#modal-layer{position:fixed;inset:0;z-index:1000;display:none}
#modal-layer.open{display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.65)}
.modal{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--rl);width:100%;max-width:640px;max-height:90vh;overflow-y:auto;animation:modalIn .15s ease}
@keyframes modalIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
.modal-lg{max-width:860px}
.modal-xl{max-width:1000px}
.modal-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--bg2);z-index:1}
.modal-title{font-size:14px;font-weight:600}
.modal-body{padding:16px}
.modal-footer{padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px;justify-content:flex-end}
/* FORMS */
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.form-3{grid-template-columns:1fr 1fr 1fr}
.form-group{margin-bottom:10px}
.form-label{display:block;font-size:10px;color:var(--text2);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px}
.form-label .req{color:var(--red)}
.form-input,.form-select,.form-textarea{width:100%;background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:7px 9px;border-radius:6px;font-size:12px;outline:none;font-family:inherit;transition:border-color .1s}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--blue)}
.form-input.err,.form-select.err{border-color:var(--red)}
.form-err{font-size:10px;color:var(--red);margin-top:3px}
.form-select option{background:var(--bg3)}
.form-textarea{resize:vertical;min-height:64px}
/* PROFILE */
.prof-hd{display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;flex-shrink:0}
.av-blue{background:var(--blue-bg);color:var(--blue)}
.av-green{background:var(--green-bg);color:var(--green)}
.av-purple{background:var(--purple-bg);color:var(--purple)}
.av-amber{background:var(--amber-bg);color:var(--amber)}
/* TABS */
.tabs{display:flex;gap:1px;border-bottom:1px solid var(--border);margin-bottom:14px;overflow-x:auto}
.tab{padding:7px 12px;cursor:pointer;font-size:12px;color:var(--text2);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .1s;white-space:nowrap;flex-shrink:0}
.tab:hover{color:var(--text)}
.tab.act{color:var(--blue);border-bottom-color:var(--blue)}
.tab-pane{display:none}
.tab-pane.act{display:block}
/* TIMELINE */
.tl-item{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)}
.tl-item:last-child{border-bottom:none}
.tl-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.tl-blue{background:var(--blue)}
.tl-red{background:var(--red)}
.tl-amber{background:var(--amber)}
.tl-green{background:var(--green)}
.tl-body{flex:1}
.tl-title{font-size:11px;font-weight:500}
.tl-meta{font-size:10px;color:var(--text3);margin-top:1px}
/* ALERTS */
.alert-item{display:flex;align-items:flex-start;gap:8px;padding:9px 12px;border-radius:8px;margin-bottom:6px;border:1px solid;cursor:pointer;transition:all .1s}
.alert-item:hover{filter:brightness(1.05)}
.al-c{background:var(--red-bg);border-color:rgba(248,81,73,.2)}
.al-w{background:var(--amber-bg);border-color:rgba(210,153,34,.2)}
.al-i{background:var(--blue-bg);border-color:rgba(31,111,235,.2)}
.alert-icon{font-size:15px;flex-shrink:0;margin-top:1px}
.al-c .alert-icon{color:var(--red)}
.al-w .alert-icon{color:var(--amber)}
.al-i .alert-icon{color:var(--blue)}
.alert-body{flex:1}
.alert-title{font-size:11px;font-weight:600}
.alert-sub{font-size:10px;color:var(--text2);margin-top:1px}
/* HEATMAP */
.hm-cell{width:22px;height:22px;border-radius:3px;display:inline-block;cursor:pointer;transition:transform .1s}
.hm-cell:hover{transform:scale(1.2)}
/* MISC */
.empty{text-align:center;padding:32px 16px;color:var(--text3)}
.empty i{font-size:28px;display:block;margin-bottom:6px;opacity:.3}
.notice{background:var(--blue-bg);border:1px solid rgba(31,111,235,.2);border-radius:8px;padding:10px 12px;display:flex;gap:8px;align-items:flex-start;margin-bottom:12px;font-size:11px;color:var(--text2);line-height:1.6}
.notice i{color:var(--blue);flex-shrink:0;font-size:14px;margin-top:1px}
.chip{background:var(--bg4);border:1px solid var(--border);color:var(--text2);padding:2px 7px;border-radius:10px;font-size:10px}
.stat-box{background:var(--bg3);border-radius:6px;padding:10px;text-align:center}
.stat-box .sv{font-size:20px;font-weight:700;line-height:1.1}
.stat-box .sl{font-size:10px;color:var(--text3);margin-top:2px}
.drag-zone{border:2px dashed var(--border2);border-radius:10px;padding:24px;text-align:center;cursor:pointer;transition:border-color .15s;margin-bottom:10px}
.drag-zone:hover,.drag-zone.dragging{border-color:var(--blue);background:var(--blue-bg)}
.drag-zone i{font-size:24px;color:var(--text3);display:block;margin-bottom:6px}
.prog-bar{height:6px;border-radius:3px;background:var(--bg4);margin-top:6px;overflow:hidden}
.prog-fill{height:100%;border-radius:3px;transition:width .4s}
/* EXPANDABLE ROW */
.exp-row{background:var(--bg3)}
.exp-row td{padding:12px}
.exp-row.hidden{display:none}
/* INLINE EDIT */
.editable:hover{background:rgba(88,166,255,.08);border-radius:3px;cursor:text}
/* TOAST */
#toast-wrap{position:fixed;bottom:20px;right:20px;z-index:2000;display:flex;flex-direction:column;gap:8px}
.toast{background:var(--bg2);border:1px solid var(--border2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;font-size:12px;box-shadow:0 4px 20px rgba(0,0,0,.4);animation:toastIn .2s ease;max-width:320px}
@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.toast.out{animation:toastOut .2s ease forwards}
@keyframes toastOut{to{opacity:0;transform:translateX(20px)}}
.toast-success{border-left:3px solid var(--green)}
.toast-error{border-left:3px solid var(--red)}
.toast-info{border-left:3px solid var(--blue)}
/* WORKFLOW */
.wf-steps{display:flex;gap:0;margin:12px 0}
.wf-step{flex:1;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);font-size:10px;text-align:center;position:relative}
.wf-step:not(:last-child)::after{content:'›';position:absolute;right:-8px;top:50%;transform:translateY(-50%);color:var(--text3);font-size:14px;z-index:1}
.wf-step:first-child{border-radius:6px 0 0 6px}
.wf-step:last-child{border-radius:0 6px 6px 0}
.wf-step.done{background:var(--green-bg);border-color:rgba(63,185,80,.3);color:var(--green)}
.wf-step.current{background:var(--blue-bg);border-color:rgba(31,111,235,.3);color:var(--blue);font-weight:600}
.wf-step.pending{color:var(--text3)}
/* RESPONSIVE */
@media(max-width:860px){
  .g3{grid-template-columns:1fr 1fr}.g4{grid-template-columns:1fr 1fr}
  .g23,.g32{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}
  .kpi-grid{grid-template-columns:repeat(2,1fr)}
}
</style>
</head>
<body>
<h2 style="position:absolute;left:-9999px">Nexus Health Solutions Operational Intelligence Platform</h2>

<!-- SIDEBAR -->
<nav id="sb">
  <div class="logo">
    <div class="logo-mark"><i class="ti ti-heartbeat"></i></div>
    <div class="logo-text-wrap"><div class="logo-text">Nexus Health</div><div class="logo-sub">Operations Intelligence</div></div>
  </div>
  <div class="nsec"><div class="nl">Overview</div>
    <div class="ni act" data-view="executive"><i class="ti ti-layout-dashboard"></i><span>Executive Dashboard</span></div>
    <div class="ni" data-view="intelligence"><i class="ti ti-brain"></i><span>Intelligence Engine</span></div>
    <div class="ni" data-view="alerts"><i class="ti ti-bell"></i><span>Alert Center</span><span class="nbadge" id="sb-alert-ct">0</span></div>
  </div>
  <div class="nsec"><div class="nl">People</div>
    <div class="ni" data-view="employees"><i class="ti ti-users"></i><span>Employees</span></div>
    <div class="ni" data-view="clients"><i class="ti ti-user-heart"></i><span>Clients</span></div>
    <div class="ni" data-view="coordinators"><i class="ti ti-id-badge"></i><span>Coordinators</span></div>
  </div>
  <div class="nsec"><div class="nl">Operations</div>
    <div class="ni" data-view="staffing"><i class="ti ti-calendar-stats"></i><span>Staffing & Shifts</span></div>
    <div class="ni" data-view="callouts"><i class="ti ti-phone-off"></i><span>Callout Tracking</span></div>
    <div class="ni" data-view="overtime"><i class="ti ti-clock"></i><span>Overtime</span></div>
    <div class="ni" data-view="hospital"><i class="ti ti-building-hospital"></i><span>Hospital Events</span></div>
  </div>
  <div class="nsec"><div class="nl">Compliance</div>
    <div class="ni" data-view="authorizations"><i class="ti ti-clipboard-check"></i><span>Authorizations</span></div>
    <div class="ni" data-view="incidents"><i class="ti ti-alert-triangle"></i><span>Incidents</span></div>
    <div class="ni" data-view="credentials"><i class="ti ti-certificate"></i><span>Credentials</span></div>
    <div class="ni" data-view="complaints"><i class="ti ti-message-report"></i><span>Complaints</span></div>
  </div>
  <div class="nsec"><div class="nl">Output</div>
    <div class="ni" data-view="analytics"><i class="ti ti-chart-bar"></i><span>Analytics</span></div>
    <div class="ni" data-view="reports"><i class="ti ti-file-analytics"></i><span>Reports</span></div>
    <div class="ni" data-view="workflows"><i class="ti ti-git-branch"></i><span>Workflows</span></div>
    <div class="ni" data-view="import"><i class="ti ti-database-import"></i><span>Import / Export</span></div>
  </div>
</nav>

<!-- MAIN -->
<div id="main">
  <div id="topbar">
    <button class="tb-toggle" onclick="APP.toggleSidebar()" title="Toggle sidebar"><i class="ti ti-menu-2"></i></button>
    <div class="breadcrumb" id="breadcrumb"></div>
    <div class="gs-wrap" style="position:relative">
      <i class="ti ti-search"></i>
      <input type="text" id="global-search" placeholder="Search anything..." autocomplete="off" oninput="APP.search(this.value)" onblur="setTimeout(()=>document.getElementById('search-results').classList.remove('open'),200)">
      <div id="search-results"></div>
    </div>
    <select id="role-sel" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);padding:5px 8px;border-radius:6px;font-size:11px;outline:none" onchange="APP.setRole(this.value)">
      <option>Administrator</option><option>Executive</option><option>Director of Nursing</option>
      <option>Staffing Coordinator</option><option>HR</option><option>Compliance Officer</option>
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openQuickAdd()"><i class="ti ti-plus"></i> Add</button>
  </div>
  <div id="content">
    <div class="view act" id="v-executive"></div>
    <div class="view" id="v-intelligence"></div>
    <div class="view" id="v-alerts"></div>
    <div class="view" id="v-employees"></div>
    <div class="view" id="v-clients"></div>
    <div class="view" id="v-coordinators"></div>
    <div class="view" id="v-staffing"></div>
    <div class="view" id="v-callouts"></div>
    <div class="view" id="v-overtime"></div>
    <div class="view" id="v-hospital"></div>
    <div class="view" id="v-authorizations"></div>
    <div class="view" id="v-incidents"></div>
    <div class="view" id="v-credentials"></div>
    <div class="view" id="v-complaints"></div>
    <div class="view" id="v-analytics"></div>
    <div class="view" id="v-reports"></div>
    <div class="view" id="v-workflows"></div>
    <div class="view" id="v-import"></div>
  </div>
</div>

<!-- MODAL -->
<div id="modal-layer" onclick="if(event.target===this)APP.closeModal()">
  <div id="modal-box" class="modal"></div>
</div>

<!-- TOAST -->
<div id="toast-wrap"></div>

<script>
// ==================== DATABASE ====================
const DB = (() => {
  const STORAGE_KEY = 'nexus_db_v4';
  let data = null;

  const defaults = () => ({
    employees: [
      {id:'e1',lastName:'Williams',firstName:'Angela',role:'RN',status:'Active',coordinator:'c1',phone:'571-555-1001',hireDate:'2022-03-15',calloutsMonth:2,calloutsYTD:8,ncns:0,otHrsWeek:42,incidents:0,notes:'Vent-trained. Excellent reliability, elevated OT recently.',skills:['Vent','Trach','G-Tube'],email:'a.williams@nexus.com'},
      {id:'e2',lastName:'Brown',firstName:'Terrence',role:'LPN',status:'Active',coordinator:'c1',phone:'571-555-1002',hireDate:'2021-07-20',calloutsMonth:4,calloutsYTD:19,ncns:2,otHrsWeek:38,incidents:1,notes:'High callout trend. PIP initiated 5/1.',skills:['G-Tube','Med Mgmt'],email:'t.brown@nexus.com'},
      {id:'e3',lastName:'Davis',firstName:'Patricia',role:'HHA',status:'Active',coordinator:'c2',phone:'571-555-1003',hireDate:'2023-01-10',calloutsMonth:0,calloutsYTD:2,ncns:0,otHrsWeek:36,incidents:0,notes:'Outstanding reliability. Candidate for lead HHA.',skills:['Personal Care'],email:'p.davis@nexus.com'},
      {id:'e4',lastName:'Martinez',firstName:'Rosa',role:'RN',status:'Active',coordinator:'c2',phone:'571-555-1004',hireDate:'2020-11-05',calloutsMonth:1,calloutsYTD:5,ncns:0,otHrsWeek:44,incidents:0,notes:'Trach & vent specialty. High demand across cases.',skills:['Vent','Trach','Peds'],email:'r.martinez@nexus.com'},
      {id:'e5',lastName:'Jackson',firstName:'Kevin',role:'CNA',status:'Active',coordinator:'c3',phone:'571-555-1005',hireDate:'2022-09-30',calloutsMonth:3,calloutsYTD:14,ncns:1,otHrsWeek:32,incidents:1,notes:'Recurring late callouts. Counseled 3x. Final warning issued.',skills:['Personal Care','Med Mgmt'],email:'k.jackson@nexus.com'},
      {id:'e6',lastName:'Lee',firstName:'Jennifer',role:'RN',status:'Inactive',coordinator:'c3',phone:'571-555-1006',hireDate:'2019-04-18',calloutsMonth:0,calloutsYTD:0,ncns:0,otHrsWeek:0,incidents:0,notes:'On approved medical LOA. Return date TBD.',skills:['RN General'],email:'j.lee@nexus.com'}
    ],
    clients: [
      {id:'cl1',lastName:'Thompson',firstName:'Marcus',medicaidId:'MA123456789',coordinatorId:'c1',authType:'24 Hours-Nursing',paExpDate:'2025-06-08',waiver:true,statePlan:false,hospitalActive:false,openShifts:2,skills:['Vent','Trach','G-Tube'],nursesAssigned:['e1','e4'],notes:'Complex case. Vent-dependent. Family very involved in care.'},
      {id:'cl2',lastName:'Garcia',firstName:'Sofia',medicaidId:'MA987654321',coordinatorId:'c1',authType:'16 Hours-Nursing',paExpDate:'2025-08-15',waiver:false,statePlan:true,hospitalActive:false,openShifts:0,skills:['G-Tube','Med Mgmt'],nursesAssigned:['e2'],notes:'G-tube feeding QID. Family speaks Spanish primarily.'},
      {id:'cl3',lastName:'Anderson',firstName:'James',medicaidId:'MA456789123',coordinatorId:'c2',authType:'12 Hours-Nursing',paExpDate:'2025-07-20',waiver:true,statePlan:false,hospitalActive:true,openShifts:1,skills:['Trach'],nursesAssigned:['e3'],notes:'Currently hospitalized at Inova Fairfax. Expected discharge 5/20.'},
      {id:'cl4',lastName:'Wilson',firstName:'Emma',medicaidId:'MA321654987',coordinatorId:'c2',authType:'24 Hours-Nursing',paExpDate:'2025-05-30',waiver:true,statePlan:false,hospitalActive:false,openShifts:3,skills:['Vent','Trach'],nursesAssigned:['e4'],notes:'PA CRITICAL — expires in days. Single-nurse coverage only. Urgent.'},
      {id:'cl5',lastName:'Harris',firstName:'Olivia',medicaidId:'MA654321789',coordinatorId:'c3',authType:'16 Hours-Nursing',paExpDate:'2025-09-10',waiver:false,statePlan:true,hospitalActive:false,openShifts:0,skills:['Med Mgmt'],nursesAssigned:['e5','e1'],notes:'Stable case. Two nurses assigned. Good family communication.'}
    ],
    coordinators: [
      {id:'c1',name:'Maricar Santos',email:'m.santos@nexus.com',phone:'571-555-0101',active:true},
      {id:'c2',name:'Desirae Johnson',email:'d.johnson@nexus.com',phone:'571-555-0102',active:true},
      {id:'c3',name:'Rachel Thompson',email:'r.thompson@nexus.com',phone:'571-555-0103',active:true}
    ],
    callouts: [
      {id:'co1',date:'2025-05-12',employeeId:'e2',clientId:'cl1',coordinatorId:'c1',shift:'7am–7pm',type:'Late (<2hr)',noticeHours:.5,covered:false,notes:'No coverage found — missed visit logged.'},
      {id:'co2',date:'2025-05-10',employeeId:'e5',clientId:'cl5',coordinatorId:'c3',shift:'7pm–7am',type:'NCNS',noticeHours:0,covered:true,notes:'Float nurse covered after 2hrs.'},
      {id:'co3',date:'2025-05-08',employeeId:'e1',clientId:'cl1',coordinatorId:'c1',shift:'7am–7pm',type:'2–4hr Notice',noticeHours:3,covered:true,notes:'Rosa Martinez covered partial shift.'},
      {id:'co4',date:'2025-05-05',employeeId:'e2',clientId:'cl2',coordinatorId:'c1',shift:'8am–8pm',type:'Late (<2hr)',noticeHours:1,covered:false,notes:'Missed visit confirmed. Family notified.'},
      {id:'co5',date:'2025-05-01',employeeId:'e5',clientId:'cl5',coordinatorId:'c3',shift:'7am–3pm',type:'Late (<2hr)',noticeHours:.5,covered:true,notes:'PRN staff covered.'},
      {id:'co6',date:'2025-04-25',employeeId:'e2',clientId:'cl1',coordinatorId:'c1',shift:'7am–7pm',type:'NCNS',noticeHours:0,covered:false,notes:'Second NCNS this month.'},
      {id:'co7',date:'2025-04-18',employeeId:'e5',clientId:'cl5',coordinatorId:'c3',shift:'3pm–11pm',type:'Late (<2hr)',noticeHours:.75,covered:true,notes:'Float covered.'}
    ],
    openShifts: [
      {id:'os1',date:'2025-05-14',clientId:'cl1',coordinatorId:'c1',shift:'7am–7pm',type:'OPEN',reason:'Primary nurse callout',status:'Open',missedVisit:false,notes:''},
      {id:'os2',date:'2025-05-14',clientId:'cl4',coordinatorId:'c2',shift:'7pm–7am',type:'OPEN',reason:'No nurse assigned for night shift',status:'Open',missedVisit:false,notes:''},
      {id:'os3',date:'2025-05-13',clientId:'cl4',coordinatorId:'c2',shift:'7am–7pm',type:'MISSED VISIT',reason:'NCNS by assigned nurse',status:'Missed Visit',missedVisit:true,notes:'Family reported. Incident filed.'},
      {id:'os4',date:'2025-05-12',clientId:'cl3',coordinatorId:'c2',shift:'8am–4pm',type:'COVER',reason:'Regular nurse hospitalized',status:'Pending',missedVisit:false,notes:''},
      {id:'os5',date:'2025-05-14',clientId:'cl4',coordinatorId:'c2',shift:'7am–7pm',type:'OPEN',reason:'No nurse available',status:'Open',missedVisit:false,notes:'Critical — vent patient'}
    ],
    authorizations: [
      {id:'a1',clientId:'cl1',agency:'Nexus Health Solutions',cmContact:'Lisa Ray',cmPhone:'703-555-0201',statePlan:false,waiver:true,libertyEnd:'2025-08-01',paExpDate:'2025-06-08',medicaidExp:'2025-12-31',dcccActive:true,epofFaxed:'2025-04-01',epofReceived:'2025-04-05',notes:''},
      {id:'a2',clientId:'cl2',agency:'Nexus Health Solutions',cmContact:'Mark Chen',cmPhone:'703-555-0202',statePlan:true,waiver:false,libertyEnd:'2025-09-15',paExpDate:'2025-08-15',medicaidExp:'2025-12-31',dcccActive:true,epofFaxed:'2025-03-15',epofReceived:'2025-03-20',notes:''},
      {id:'a3',clientId:'cl3',agency:'Nexus Health Solutions',cmContact:'Sandra Kim',cmPhone:'703-555-0203',statePlan:false,waiver:true,libertyEnd:'2025-10-01',paExpDate:'2025-07-20',medicaidExp:'2025-12-31',dcccActive:true,epofFaxed:'',epofReceived:'',notes:'ePOF not yet submitted — urgent.'},
      {id:'a4',clientId:'cl4',agency:'Nexus Health Solutions',cmContact:'David Park',cmPhone:'703-555-0204',statePlan:false,waiver:true,libertyEnd:'2025-06-30',paExpDate:'2025-05-30',medicaidExp:'2025-12-31',dcccActive:false,epofFaxed:'',epofReceived:'',notes:'CRITICAL: PA expires May 30. DCCC inactive. Escalate immediately.'},
      {id:'a5',clientId:'cl5',agency:'Nexus Health Solutions',cmContact:'Amy Lee',cmPhone:'703-555-0205',statePlan:true,waiver:false,libertyEnd:'2025-11-01',paExpDate:'2025-09-10',medicaidExp:'2025-12-31',dcccActive:true,epofFaxed:'2025-04-10',epofReceived:'2025-04-12',notes:''}
    ],
    overtimes: [
      {id:'ot1',employeeId:'e1',clientId:'cl1',schedule:'7am–7pm',wk1:12,wk2:10,wk3:8,wk4:10,status:'Approved',approvedBy:'Maricar Santos',notes:''},
      {id:'ot2',employeeId:'e4',clientId:'cl1',schedule:'7pm–7am',wk1:8,wk2:12,wk3:6,wk4:8,status:'Approved',approvedBy:'Desirae Johnson',notes:''},
      {id:'ot3',employeeId:'e4',clientId:'cl4',schedule:'7am–7pm',wk1:14,wk2:12,wk3:10,wk4:12,status:'Pending Approval',approvedBy:'',notes:'Second concurrent OT — needs DON review'},
      {id:'ot4',employeeId:'e2',clientId:'cl2',schedule:'8am–8pm',wk1:6,wk2:4,wk3:8,wk4:6,status:'Approved',approvedBy:'Maricar Santos',notes:''}
    ],
    hospitalEvents: [
      {id:'h1',clientId:'cl3',hospital:'Inova Fairfax Hospital',floor:'4B',scheduledHrs:12,admissionDate:'2025-05-01',reason:'Respiratory Distress — vent adjustment needed',caseManager:'Sandra Kim',cmPhone:'703-555-0203',dischargeDate:'',status:'Active',notes:'Expected discharge 5/20. Home nursing restart confirmed on discharge.'},
      {id:'h2',clientId:'cl4',hospital:"Children's National Hospital",floor:'PICU 2',scheduledHrs:24,admissionDate:'2025-04-28',reason:'Trach site infection',caseManager:'David Park',cmPhone:'703-555-0204',dischargeDate:'2025-05-10',status:'Follow-up Needed',notes:'Discharged 5/10. Home nursing restarted 5/12. Follow-up appointment 5/20.'}
    ],
    incidents: [
      {id:'i1',date:'2025-05-10',type:'Medication Error',clientId:'cl2',employeeId:'e2',severity:'High',status:'Under Review',assignedTo:'c1',dueDate:'2025-05-20',description:'Wrong dosage administered. Supervisor notified immediately. Client assessed — no adverse outcome.',rootCause:'',resolution:'',notes:'Staff counseled same day. In-service scheduled.'},
      {id:'i2',date:'2025-05-05',type:'Behavioral',clientId:'cl1',employeeId:'e1',severity:'Medium',status:'Resolved',assignedTo:'c3',dueDate:'2025-05-12',description:'Client combative during personal care. Nurse safety concern documented.',rootCause:'Unmet behavioral health needs',resolution:'Behavioral plan updated with care team. Psychiatry consult ordered.',notes:''},
      {id:'i3',date:'2025-04-28',type:'Documentation',clientId:'cl5',employeeId:'e5',severity:'Low',status:'Resolved',assignedTo:'c2',dueDate:'2025-05-05',description:'Visit notes 3 days late. Billing flag triggered. Third occurrence.',rootCause:'Staff training gap — EMR navigation',resolution:'In-service completed 5/2. No further occurrences.',notes:''}
    ],
    credentials: [
      {id:'cr1',employeeId:'e1',type:'CPR',issueDate:'2024-06-01',expiryDate:'2026-06-01',document:'CPR_Williams_2024.pdf'},
      {id:'cr2',employeeId:'e1',type:'TB Test',issueDate:'2024-05-15',expiryDate:'2025-05-15',document:''},
      {id:'cr3',employeeId:'e2',type:'State License',issueDate:'2022-07-01',expiryDate:'2025-07-01',document:'LPN_Brown_License.pdf'},
      {id:'cr4',employeeId:'e3',type:'CPR',issueDate:'2024-08-01',expiryDate:'2026-08-01',document:'CPR_Davis_2024.pdf'},
      {id:'cr5',employeeId:'e4',type:'Annual Physical',issueDate:'2024-11-01',expiryDate:'2025-11-01',document:'Physical_Martinez_2024.pdf'},
      {id:'cr6',employeeId:'e5',type:'Background Check',issueDate:'2022-09-30',expiryDate:'2025-09-30',document:'BC_Jackson_2022.pdf'},
      {id:'cr7',employeeId:'e2',type:'CPR',issueDate:'2023-03-15',expiryDate:'2025-03-15',document:''}
    ],
    complaints: [
      {id:'cm1',date:'2025-05-08',source:'Client/Family',against:'e2',category:'Professional Conduct',priority:'High',status:'Under Investigation',assignedTo:'c3',resolutionDate:'',description:'Family reports nurse arrived 2 hours late with no communication. Third occurrence.',notes:'Interview with nurse scheduled 5/15.'},
      {id:'cm2',date:'2025-04-20',source:'Staff',against:'scheduling',category:'Operational',priority:'Medium',status:'Resolved',assignedTo:'c1',resolutionDate:'2025-05-01',description:'Multiple nurses reporting last-minute schedule changes without notice.',notes:'Process updated. 48hr advance notice policy implemented.'}
    ],
    alerts: [],
    workflows: [],
    auditLog: [],
    importHistory: []
  });

  const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch(e){} };
  const load = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) { data = JSON.parse(stored); return; }
    } catch(e) {}
    data = defaults();
    save();
  };

  load();

  // Computed helpers
  const daysBetween = (d1, d2=new Date()) => Math.ceil((new Date(d1) - new Date(d2)) / 86400000);
  const today = () => new Date();

  const stabilityScore = (cl) => {
    let s = 100;
    s -= cl.openShifts * 10;
    if (cl.hospitalActive) s -= 20;
    if (!cl.nursesAssigned || cl.nursesAssigned.length <= 1) s -= 15;
    const d = daysBetween(cl.paExpDate);
    if (d < 0) s -= 30; else if (d < 14) s -= 25; else if (d < 30) s -= 18; else if (d < 60) s -= 8;
    const calls = data.callouts.filter(c => c.clientId === cl.id);
    s -= calls.length * 5;
    return Math.max(0, Math.min(100, Math.round(s)));
  };

  const reliabilityScore = (emp) => {
    let s = 100;
    s -= emp.calloutsMonth * 12;
    s -= emp.ncns * 20;
    s -= emp.incidents * 8;
    return Math.max(0, Math.min(100, Math.round(s)));
  };

  const burnoutScore = (emp) => {
    let s = 0;
    if (emp.otHrsWeek >= 44) s += 40; else if (emp.otHrsWeek >= 38) s += 22;
    s += emp.calloutsMonth * 15;
    s += emp.incidents * 10;
    return Math.min(100, Math.round(s));
  };

  const coordEfficiency = (cid) => {
    const clients = data.clients.filter(c => c.coordinatorId === cid);
    const calls = data.callouts.filter(c => c.coordinatorId === cid);
    const shifts = data.openShifts.filter(s => s.coordinatorId === cid);
    let s = 100;
    s -= calls.length * 8;
    s -= shifts.filter(x => x.status === 'Open').length * 12;
    s -= clients.filter(c => stabilityScore(c) < 40).length * 10;
    return Math.max(0, Math.min(100, Math.round(s)));
  };

  const getCoord = id => data.coordinators.find(c => c.id === id) || {name:'Unassigned'};
  const getEmp = id => data.employees.find(e => e.id === id);
  const getClient = id => data.clients.find(c => c.id === id);
  const empName = id => { const e = getEmp(id); return e ? `${e.firstName} ${e.lastName}` : '—'; };
  const clientName = id => { const c = getClient(id); return c ? `${c.firstName} ${c.lastName}` : '—'; };
  const coordName = id => getCoord(id).name;

  const generateAlerts = () => {
    const als = [];
    data.clients.forEach(cl => {
      const d = daysBetween(cl.paExpDate);
      if (d <= 7) als.push({id:'al_pa_'+cl.id,sev:'critical',cat:'pa',title:`PA Expiring in ${d} days — ${clientName(cl.id)}`,sub:`Medicaid ID: ${cl.medicaidId} | Coord: ${coordName(cl.coordinatorId)}`,status:'active',link:'authorizations',clientId:cl.id,created:new Date().toISOString()});
      else if (d <= 30) als.push({id:'al_pa30_'+cl.id,sev:'warning',cat:'pa',title:`PA Expiring in ${d} days — ${clientName(cl.id)}`,sub:`Contact CM immediately. Coord: ${coordName(cl.coordinatorId)}`,status:'active',link:'authorizations',clientId:cl.id,created:new Date().toISOString()});
    });
    data.employees.filter(e=>e.status==='Active').forEach(emp => {
      if (emp.calloutsMonth >= 3) als.push({id:'al_co_'+emp.id,sev:'warning',cat:'staffing',title:`Repeated Callouts — ${empName(emp.id)}`,sub:`${emp.calloutsMonth} callouts this month. ${emp.ncns>0?'NCNS flag.':''} Coord: ${coordName(emp.coordinator)}`,status:'active',link:'callouts',empId:emp.id,created:new Date().toISOString()});
      if (emp.otHrsWeek >= 42) als.push({id:'al_ot_'+emp.id,sev:'warning',cat:'staffing',title:`OT Risk — ${empName(emp.id)}`,sub:`${emp.otHrsWeek}h this week. Burnout risk elevated.`,status:'active',link:'overtime',empId:emp.id,created:new Date().toISOString()});
    });
    data.openShifts.filter(s=>s.missedVisit).forEach(s => {
      als.push({id:'al_mv_'+s.id,sev:'critical',cat:'staffing',title:`Missed Visit — ${clientName(s.clientId)}`,sub:`Date: ${s.date} | Shift: ${s.shift}`,status:'active',link:'staffing',shiftId:s.id,created:new Date().toISOString()});
    });
    data.incidents.filter(i=>i.status==='Under Review').forEach(i => {
      als.push({id:'al_inc_'+i.id,sev:'warning',cat:'compliance',title:`Open Incident — ${i.type}`,sub:`Client: ${clientName(i.clientId)} | Staff: ${empName(i.employeeId)} | Due: ${i.dueDate}`,status:'active',link:'incidents',incId:i.id,created:new Date().toISOString()});
    });
    data.credentials.forEach(c => {
      const d = daysBetween(c.expiryDate);
      if (d < 0) als.push({id:'al_cr_'+c.id,sev:'critical',cat:'compliance',title:`Expired Credential — ${empName(c.employeeId)}`,sub:`${c.type} expired ${c.expiryDate}. Action required.`,status:'active',link:'credentials',credId:c.id,created:new Date().toISOString()});
      else if (d <= 30) als.push({id:'al_cr30_'+c.id,sev:'warning',cat:'compliance',title:`Credential Expiring — ${empName(c.employeeId)}`,sub:`${c.type} expires ${c.expiryDate} (${d} days).`,status:'active',link:'credentials',credId:c.id,created:new Date().toISOString()});
    });
    // merge statuses from existing alerts
    als.forEach(a => {
      const ex = data.alerts.find(x=>x.id===a.id);
      if (ex) a.status = ex.status;
    });
    data.alerts = als;
    save();
    return als;
  };

  const uid = () => 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2,6);
  const audit = (action, entity, id, changes) => {
    data.auditLog.unshift({id:uid(),ts:new Date().toISOString(),action,entity,recordId:id,changes,user:document.getElementById('role-sel')?.value||'Administrator'});
    if (data.auditLog.length > 500) data.auditLog = data.auditLog.slice(0,500);
  };

  return { data, save, uid, daysBetween, today,
    stabilityScore, reliabilityScore, burnoutScore, coordEfficiency,
    getCoord, getEmp, getClient, empName, clientName, coordName,
    generateAlerts, audit };
})();

// ==================== STATE ====================
const STATE = {
  currentView: 'executive',
  history: ['executive'],
  historyIdx: 0,
  tables: {},    // per-view: {sort, sortDir, page, filters}
  charts: {},    // chart instances
  role: 'Administrator',
  sidebarCollapsed: false,

  getTable(view) {
    if (!this.tables[view]) this.tables[view] = {sort:null,sortDir:'asc',page:1,pageSize:15,filters:{}};
    return this.tables[view];
  }
};

// ==================== TOAST ====================
const toast = (msg, type='info') => {
  const w = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<i class="ti ti-${type==='success'?'check':type==='error'?'x':'info-circle'}" style="color:var(--${type==='success'?'green':type==='error'?'red':'blue'})"></i><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(()=>el.remove(),200); }, 3000);
};

// ==================== SCORE HELPERS ====================
const scoreColor = (s, invert=false) => {
  if (!invert) return s >= 70 ? 'var(--green)' : s >= 40 ? 'var(--amber)' : 'var(--red)';
  return s <= 30 ? 'var(--green)' : s <= 60 ? 'var(--amber)' : 'var(--red)';
};
const scoreClass = (s, invert=false) => {
  if (!invert) return s>=70?'sr-green':s>=40?'sr-amber':'sr-red';
  return s<=30?'sr-green':s<=60?'sr-amber':'sr-red';
};
const riskPill = (s, invert=false) => {
  const label = !invert ? (s>=70?'Stable':s>=40?'Warning':'Critical') : (s<=30?'Low':s<=60?'Medium':'High');
  const cls = !invert ? (s>=70?'rp-stable':s>=40?'rp-warning':'rp-critical') : (s<=30?'rp-stable':s<=60?'rp-warning':'rp-critical');
  return `<span class="risk-pill ${cls}">${label}</span>`;
};
const scoreBar = (s, invert=false, w=80) => `<div class="score-bar" style="width:${w}px"><div class="score-fill" style="width:${s}%;background:${scoreColor(s,invert)}"></div></div>`;
const daysBadge = d => {
  const cls = d<=14?'br':d<=30?'ba':d<=60?'bb':'bg';
  return `<span class="badge ${cls}">${d<0?`${Math.abs(d)}d overdue`:`${d}d`}</span>`;
};

// ==================== SORTING ====================
const sortRows = (rows, field, dir) => {
  if (!field) return rows;
  return [...rows].sort((a,b)=>{
    let av=a[field]??'', bv=b[field]??'';
    if (typeof av === 'number') return dir==='asc' ? av-bv : bv-av;
    return dir==='asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });
};

// ==================== TABLE BUILDER ====================
const buildTable = (view, cols, rows, onRowClick) => {
  const st = STATE.getTable(view);
  const sorted = sortRows(rows, st.sort, st.sortDir);
  const total = sorted.length;
  const pages = Math.max(1, Math.ceil(total / st.pageSize));
  const paged = sorted.slice((st.page-1)*st.pageSize, st.page*st.pageSize);

  const thHtml = cols.map(c => {
    if (!c.field) return `<th style="${c.style||''}">${c.label}</th>`;
    const sorted2 = st.sort===c.field;
    const dir2 = sorted2 ? (st.sortDir==='asc'?'↑':'↓') : '↕';
    return `<th class="${sorted2?'sorted':''}" data-field="${c.field}" style="${c.style||''}" onclick="APP.sortTable('${view}','${c.field}')">${c.label}<span class="sort-icon">${dir2}</span></th>`;
  }).join('');

  const tdHtml = paged.length ? paged.map(r => onRowClick(r)).join('') :
    `<tr><td colspan="${cols.length}" style="text-align:center;padding:24px;color:var(--text3)">No records found</td></tr>`;

  const pagHtml = pages > 1 ? `<div class="pagination">
    <span class="pag-info">${(st.page-1)*st.pageSize+1}–${Math.min(st.page*st.pageSize,total)} of ${total}</span>
    <div class="pag-btn" onclick="APP.setPage('${view}',1)"><i class="ti ti-chevrons-left"></i></div>
    <div class="pag-btn" onclick="APP.setPage('${view}',${st.page-1})"><i class="ti ti-chevron-left"></i></div>
    ${Array.from({length:Math.min(5,pages)},(_,i)=>{const p=Math.max(1,Math.min(st.page-2,pages-4))+i;return `<div class="pag-btn ${p===st.page?'act':''}" onclick="APP.setPage('${view}',${p})">${p}</div>`;}).join('')}
    <div class="pag-btn" onclick="APP.setPage('${view}',${st.page+1})"><i class="ti ti-chevron-right"></i></div>
    <div class="pag-btn" onclick="APP.setPage('${view}',${pages})"><i class="ti ti-chevrons-right"></i></div>
  </div>` : `<div style="font-size:10px;color:var(--text3);padding:6px 0;text-align:right">${total} record${total!==1?'s':''}</div>`;

  return `<div class="tbl-wrap"><table><thead><tr>${thHtml}</tr></thead><tbody>${tdHtml}</tbody></table></div>${pagHtml}`;
};

// ==================== FORM BUILDER ====================
const field = (id,label,type='text',opts=[],val='',required=false,placeholder='') => {
  const req = required ? '<span class="req">*</span>' : '';
  if (type==='select') return `<div class="form-group"><label class="form-label">${label}${req}</label><select class="form-select" id="f_${id}">${opts.map(o=>typeof o==='object'?`<option value="${o.v}" ${o.v==val?'selected':''}>${o.l}</option>`:`<option value="${o}" ${o==val?'selected':''}>${o}</option>`).join('')}</select></div>`;
  if (type==='textarea') return `<div class="form-group"><label class="form-label">${label}${req}</label><textarea class="form-textarea" id="f_${id}" placeholder="${placeholder}">${val}</textarea></div>`;
  if (type==='checkbox') return `<div class="form-group" style="display:flex;align-items:center;gap:8px;padding-top:20px"><input type="checkbox" id="f_${id}" ${val?'checked':''}><label class="form-label" for="f_${id}" style="margin:0">${label}</label></div>`;
  return `<div class="form-group"><label class="form-label">${label}${req}</label><input type="${type}" class="form-input" id="f_${id}" value="${val}" placeholder="${placeholder}"></div>`;
};
const fv = id => { const el=document.getElementById('f_'+id); return el?(el.type==='checkbox'?el.checked:el.value):''; };
const fset = (id,v) => { const el=document.getElementById('f_'+id); if(el){if(el.type==='checkbox')el.checked=v;else el.value=v;}};
const validate = (rules) => {
  let ok = true;
  rules.forEach(([id,msg])=>{
    const el=document.getElementById('f_'+id); if(!el) return;
    const empty = !el.value.trim();
    el.classList.toggle('err',empty);
    let em=el.parentElement.querySelector('.form-err');
    if(empty){if(!em){em=document.createElement('div');em.className='form-err';el.after(em);}em.textContent=msg;ok=false;}
    else if(em)em.remove();
  });
  return ok;
};

// ==================== MODAL ====================
const openModal = (html, size='') => {
  const layer = document.getElementById('modal-layer');
  const box = document.getElementById('modal-box');
  box.className = 'modal ' + size;
  box.innerHTML = html;
  layer.classList.add('open');
};
const closeModal = () => document.getElementById('modal-layer').classList.remove('open');

const modalShell = (title, body, footer) =>
  `<div class="modal-hd"><div class="modal-title">${title}</div><button class="btn btn-sm btn-ghost" onclick="APP.closeModal()"><i class="ti ti-x"></i></button></div>
   <div class="modal-body">${body}</div>
   ${footer?`<div class="modal-footer">${footer}</div>`:''}`;

// ==================== CHARTS ====================
const destroyChart = id => { if(STATE.charts[id]){STATE.charts[id].destroy();delete STATE.charts[id];} };
const makeChart = (id,cfg) => {
  destroyChart(id);
  const ctx=document.getElementById(id);
  if(!ctx)return;
  STATE.charts[id]=new Chart(ctx,cfg);
};

// ==================== VIEWS ====================
const VIEWS = {};

// ---- EXECUTIVE ----
VIEWS.executive = () => {
  const d = DB.data;
  DB.generateAlerts();
  const activeClients = d.clients.length;
  const activeEmps = d.employees.filter(e=>e.status==='Active').length;
  const openShifts = d.openShifts.filter(s=>s.status==='Open').length;
  const callouts30 = d.callouts.length;
  const paExp30 = d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=30).length;
  const otRisk = d.employees.filter(e=>e.otHrsWeek>=38&&e.status==='Active').length;
  const openInc = d.incidents.filter(i=>i.status!=='Resolved').length;
  const hospActive = d.hospitalEvents.filter(h=>h.status==='Active').length;
  const critCases = d.clients.filter(c=>DB.stabilityScore(c)<40).length;
  const credExp = d.credentials.filter(c=>DB.daysBetween(c.expiryDate)<=30).length;
  const activeAlerts = d.alerts.filter(a=>a.status==='active');

  return `
  <div class="kpi-grid">
    ${kpiCard('Active Clients',activeClients,'Across all coordinators','--blue','clients','user-heart')}
    ${kpiCard('Active Employees',activeEmps,'Nurses + HHAs','--green','employees','users')}
    ${kpiCard('Open Shifts',openShifts,'Requiring coverage','--red','staffing','calendar-x')}
    ${kpiCard('Callouts (30d)',callouts30,'This rolling month','--amber','callouts','phone-off')}
    ${kpiCard('PA Expiring ≤30d',paExp30,'Needs immediate action','--purple','authorizations','certificate')}
    ${kpiCard('OT Risk Employees',otRisk,'≥38 hrs this week','--purple','overtime','clock')}
    ${kpiCard('Open Incidents',openInc,'Unresolved','--red','incidents','alert-triangle')}
    ${kpiCard('Hospital Events',hospActive,'Active admissions','--cyan','hospital','building-hospital')}
    ${kpiCard('Critical Cases',critCases,'Stability score <40','--red','intelligence','alert-circle')}
    ${kpiCard('Expiring Credentials',credExp,'Within 30 days','--amber','credentials','certificate')}
  </div>
  <div class="g23">
    <div class="card">
      <div class="card-hd"><span class="card-title">Callout Trend — 8 Weeks</span><button class="btn btn-xs" onclick="APP.navigate('analytics')">View Analytics</button></div>
      <div style="position:relative;height:180px"><canvas id="exec-chart" role="img" aria-label="Callout trend">Callout data</canvas></div>
    </div>
    <div class="card">
      <div class="card-hd"><span class="card-title">Active Alerts</span><button class="btn btn-xs" onclick="APP.navigate('alerts')">View All (${activeAlerts.length})</button></div>
      ${activeAlerts.slice(0,4).map(a=>`
        <div class="alert-item al-${a.sev==='critical'?'c':a.sev==='warning'?'w':'i'}" onclick="APP.navigate('${a.link||'alerts'}')">
          <i class="ti ti-${a.sev==='critical'?'alert-octagon':'alert-triangle'} alert-icon"></i>
          <div class="alert-body"><div class="alert-title">${a.title}</div><div class="alert-sub">${a.sub}</div></div>
        </div>`).join('')||'<div class="empty"><i class="ti ti-check"></i><strong>No active alerts</strong></div>'}
    </div>
  </div>
  <div class="g2">
    <div class="card">
      <div class="card-hd"><span class="card-title">Case Stability</span><button class="btn btn-xs" onclick="APP.navigate('intelligence')">Full Analysis</button></div>
      ${d.clients.map(cl=>{const s=DB.stabilityScore(cl);return `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.openClientProfile('${cl.id}')">
          <span style="flex:1;font-size:12px">${cl.firstName} ${cl.lastName}</span>
          ${scoreBar(s,false,70)}<span style="font-size:11px;width:24px;color:${scoreColor(s)}">${s}</span>${riskPill(s)}
        </div>`}).join('')}
    </div>
    <div class="card">
      <div class="card-hd"><span class="card-title">Coordinator Efficiency</span><button class="btn btn-xs" onclick="APP.navigate('coordinators')">Full View</button></div>
      ${d.coordinators.map(co=>{const s=DB.coordEfficiency(co.id);return `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.navigate('coordinators')">
          <span style="flex:1;font-size:12px">${co.name}</span>
          ${scoreBar(s,false,70)}<span style="font-size:11px;width:24px;color:${scoreColor(s)}">${s}</span>
        </div>`}).join('')}
    </div>
  </div>`;

  function kpiCard(label,val,sub,color,nav,icon) {
    return `<div class="kpi" onclick="APP.navigate('${nav}')" title="Click to open ${label}">
      <div class="kpi-accent" style="background:var(${color})"></div>
      <div class="kpi-label"><i class="ti ti-${icon}" style="color:var(${color})"></i> ${label}</div>
      <div class="kpi-val">${val}</div>
      <div class="kpi-sub">${sub}</div>
    </div>`;
  }
};

// ---- INTELLIGENCE ----
VIEWS.intelligence = () => {
  const d = DB.data;
  return `
  <div class="notice"><i class="ti ti-brain"></i>Scores compute live from your operational data. Click any row to drill into the full profile.</div>
  <div class="tabs" id="intel-tabs">
    <div class="tab act" onclick="APP.switchTab('intel-tabs',this,'intel-tp-stability')">Case Stability</div>
    <div class="tab" onclick="APP.switchTab('intel-tabs',this,'intel-tp-reliability')">Employee Reliability</div>
    <div class="tab" onclick="APP.switchTab('intel-tabs',this,'intel-tp-burnout')">Burnout Risk</div>
    <div class="tab" onclick="APP.switchTab('intel-tabs',this,'intel-tp-coverage')">Coverage Risk</div>
    <div class="tab" onclick="APP.switchTab('intel-tabs',this,'intel-tp-predictions')">Predictions</div>
  </div>
  <div id="intel-tp-stability" class="tab-pane act">
    <div class="card">
      <div class="card-hd"><span class="card-title">Case Stability Scores</span><span style="font-size:10px;color:var(--text3)">Callouts · Open shifts · Hospital · PA status · Staff ratio</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Client</th><th>Coordinator</th><th>Score</th><th>Risk Level</th><th>Open Shifts</th><th>Callouts</th><th>Hospital</th><th>PA Days Left</th><th>Action</th></tr></thead><tbody>
      ${d.clients.map(cl=>{
        const s=DB.stabilityScore(cl);
        const d2=DB.daysBetween(cl.paExpDate);
        return `<tr onclick="APP.openClientProfile('${cl.id}')">
          <td style="font-weight:500">${cl.firstName} ${cl.lastName}</td>
          <td><span class="badge b3">${DB.coordName(cl.coordinatorId).split(' ')[0]}</span></td>
          <td><div style="display:flex;align-items:center;gap:6px">${scoreBar(s,false,60)}<span style="font-size:11px;color:${scoreColor(s)}">${s}</span></div></td>
          <td>${riskPill(s)}</td>
          <td><span class="badge ${cl.openShifts>0?'br':'bg'}">${cl.openShifts}</span></td>
          <td>${d.callouts.filter(c=>c.clientId===cl.id).length}</td>
          <td>${cl.hospitalActive?'<span class="badge ba">Active</span>':'—'}</td>
          <td>${daysBadge(d2)}</td>
          <td><div class="row-actions"><button class="btn btn-xs" onclick="event.stopPropagation();APP.openClientProfile('${cl.id}')"><i class="ti ti-eye"></i></button></div></td>
        </tr>`;}).join('')}
      </tbody></table></div>
    </div>
  </div>
  <div id="intel-tp-reliability" class="tab-pane">
    <div class="card">
      <div class="card-hd"><span class="card-title">Employee Reliability Scores</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Employee</th><th>Role</th><th>Score</th><th>Callouts (30d)</th><th>NCNS</th><th>Incidents</th><th>OT hrs</th><th>Action</th></tr></thead><tbody>
      ${d.employees.filter(e=>e.status==='Active').map(emp=>{
        const s=DB.reliabilityScore(emp);
        return `<tr onclick="APP.openEmpProfile('${emp.id}')">
          <td style="font-weight:500">${emp.firstName} ${emp.lastName}</td>
          <td><span class="badge b3">${emp.role}</span></td>
          <td><div style="display:flex;align-items:center;gap:6px">${scoreBar(s,false,60)}<span style="font-size:11px;color:${scoreColor(s)}">${s}</span></div></td>
          <td><span class="badge ${emp.calloutsMonth>=3?'br':emp.calloutsMonth>=1?'ba':'bg'}">${emp.calloutsMonth}</span></td>
          <td><span class="badge ${emp.ncns>0?'br':'bg'}">${emp.ncns}</span></td>
          <td>${emp.incidents}</td>
          <td><span class="badge ${emp.otHrsWeek>=42?'br':emp.otHrsWeek>=38?'ba':'b3'}">${emp.otHrsWeek}h</span></td>
          <td><div class="row-actions"><button class="btn btn-xs" onclick="event.stopPropagation();APP.openEmpProfile('${emp.id}')"><i class="ti ti-eye"></i></button></div></td>
        </tr>`;}).join('')}
      </tbody></table></div>
    </div>
  </div>
  <div id="intel-tp-burnout" class="tab-pane">
    <div class="card">
      <div class="card-hd"><span class="card-title">Burnout Risk Analysis</span><span style="font-size:10px;color:var(--text3)">High OT + callouts + incidents = elevated risk</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Employee</th><th>Burnout Score</th><th>OT hrs/wk</th><th>Callouts</th><th>Risk Factors</th><th>Action</th></tr></thead><tbody>
      ${d.employees.filter(e=>e.status==='Active').map(emp=>{
        const b=DB.burnoutScore(emp);
        const factors=[];
        if(emp.otHrsWeek>=44)factors.push('OT Critical');else if(emp.otHrsWeek>=38)factors.push('OT Elevated');
        if(emp.calloutsMonth>=3)factors.push('High Callouts');
        if(emp.ncns>0)factors.push('NCNS');
        if(emp.incidents>0)factors.push('Incidents');
        return `<tr onclick="APP.openEmpProfile('${emp.id}')">
          <td style="font-weight:500">${emp.firstName} ${emp.lastName}</td>
          <td><div style="display:flex;align-items:center;gap:6px">${scoreBar(b,true,60)}<span style="font-size:11px;color:${scoreColor(b,true)}">${b}</span></div></td>
          <td><span class="badge ${emp.otHrsWeek>=42?'br':emp.otHrsWeek>=38?'ba':'b3'}">${emp.otHrsWeek}h</span></td>
          <td>${emp.calloutsMonth}</td>
          <td>${factors.map(f=>`<span class="chip">${f}</span>`).join(' ')||'—'}</td>
          <td><div class="row-actions"><button class="btn btn-xs" onclick="event.stopPropagation();APP.openEmpProfile('${emp.id}')"><i class="ti ti-eye"></i></button></div></td>
        </tr>`;}).join('')}
      </tbody></table></div>
    </div>
  </div>
  <div id="intel-tp-coverage" class="tab-pane">
    <div class="card">
      <div class="card-hd"><span class="card-title">Coverage Risk by Client</span></div>
      <div class="tbl-wrap"><table><thead><tr><th>Client</th><th>Coverage Risk</th><th>Nurses</th><th>Auth Hours</th><th>Risk Factors</th><th>Action</th></tr></thead><tbody>
      ${d.clients.map(cl=>{
        const s=DB.stabilityScore(cl);const risk=100-s;
        const factors=[];
        if(!cl.nursesAssigned||cl.nursesAssigned.length<=1)factors.push('Single Nurse');
        if(cl.openShifts>1)factors.push('Multiple Opens');
        if(cl.hospitalActive)factors.push('Hospital Active');
        if(DB.daysBetween(cl.paExpDate)<=30)factors.push('PA Critical');
        return `<tr onclick="APP.openClientProfile('${cl.id}')">
          <td style="font-weight:500">${cl.firstName} ${cl.lastName}</td>
          <td><div style="display:flex;align-items:center;gap:6px">${scoreBar(risk,true,60)}<span style="font-size:11px;color:${scoreColor(risk,true)}">${risk}</span></div></td>
          <td>${cl.nursesAssigned?cl.nursesAssigned.length:0}</td>
          <td><span class="badge b3">${cl.authType}</span></td>
          <td>${factors.map(f=>`<span class="chip">${f}</span>`).join(' ')||'—'}</td>
          <td><div class="row-actions"><button class="btn btn-xs" onclick="event.stopPropagation();APP.openClientProfile('${cl.id}')"><i class="ti ti-eye"></i></button></div></td>
        </tr>`;}).join('')}
      </tbody></table></div>
    </div>
  </div>
  <div id="intel-tp-predictions" class="tab-pane">
    <div class="g2">
      <div class="card"><div class="card-hd"><span class="card-title">Burnout Risk — Next 14 Days</span></div>
        ${d.employees.filter(e=>e.status==='Active'&&DB.burnoutScore(e)>25).map(emp=>{const b=DB.burnoutScore(emp);return `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.openEmpProfile('${emp.id}')">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:500">${emp.firstName} ${emp.lastName}</span>${riskPill(b,true)}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${b}%;background:${scoreColor(b,true)}"></div></div>
            <div style="font-size:10px;color:var(--text3);margin-top:2px">Probability of callout/resignation: ${b}%</div>
          </div>`}).join('')||'<div class="empty"><i class="ti ti-check"></i><strong>No high burnout risk</strong></div>'}
      </div>
      <div class="card"><div class="card-hd"><span class="card-title">Authorization Exhaustion Forecast</span></div>
        ${d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=90).map(a=>{
          const d2=DB.daysBetween(a.paExpDate);const cl=DB.getClient(a.clientId);
          return `<div style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.navigate('authorizations')">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:500">${cl?cl.firstName+' '+cl.lastName:'Unknown'}</span>${daysBadge(d2)}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${Math.max(0,100-d2)}%;background:${d2<=14?'var(--red)':d2<=30?'var(--amber)':'var(--blue)'}"></div></div>
          </div>`;}).join('')||'<div class="empty"><i class="ti ti-check"></i><strong>No urgent PA expirations</strong></div>'}
      </div>
    </div>
    <div class="g2">
      <div class="card"><div class="card-hd"><span class="card-title">Predicted Unstable Cases</span></div>
        ${d.clients.filter(c=>DB.stabilityScore(c)<60).map(cl=>{const s=DB.stabilityScore(cl);return `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.openClientProfile('${cl.id}')">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:500">${cl.firstName} ${cl.lastName}</span>${riskPill(s)}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${100-s}%;background:${scoreColor(s)}"></div></div>
          </div>`}).join('')||'<div class="empty"><i class="ti ti-check"></i><strong>No predicted unstable cases</strong></div>'}
      </div>
      <div class="card"><div class="card-hd"><span class="card-title">Repeated Callout Risk</span></div>
        ${d.employees.filter(e=>e.calloutsMonth>=2&&e.status==='Active').map(emp=>{const risk=Math.min(100,emp.calloutsMonth*20+emp.ncns*25);return `
          <div style="padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.openEmpProfile('${emp.id}')">
            <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:500">${emp.firstName} ${emp.lastName}</span>${riskPill(risk,true)}</div>
            <div class="prog-bar"><div class="prog-fill" style="width:${risk}%;background:${scoreColor(risk,true)}"></div></div>
            <div style="font-size:10px;color:var(--text3);margin-top:2px">${emp.calloutsMonth} callouts · ${emp.ncns} NCNS · Repeat probability: ${risk}%</div>
          </div>`}).join('')||'<div class="empty"><i class="ti ti-check"></i><strong>No repeated callout risk</strong></div>'}
      </div>
    </div>
  </div>`;
};

// ---- ALERTS ----
VIEWS.alerts = () => {
  DB.generateAlerts();
  const d = DB.data;
  const sevF = STATE.getTable('alerts').filters.sev || 'all';
  const catF = STATE.getTable('alerts').filters.cat || 'all';
  const stF = STATE.getTable('alerts').filters.status || 'active';
  const filtered = d.alerts.filter(a=>{
    if(sevF!=='all'&&a.sev!==sevF)return false;
    if(catF!=='all'&&a.cat!==catF)return false;
    if(stF&&a.status!==stF)return false;
    return true;
  });
  document.getElementById('sb-alert-ct').textContent = d.alerts.filter(a=>a.status==='active'&&a.sev==='critical').length;
  return `
  <div class="filter-bar">
    <select onchange="APP.setFilter('alerts','sev',this.value);APP.renderCurrent()">
      <option value="all" ${sevF==='all'?'selected':''}>All Severity</option>
      <option value="critical" ${sevF==='critical'?'selected':''}>Critical</option>
      <option value="warning" ${sevF==='warning'?'selected':''}>Warning</option>
      <option value="info" ${sevF==='info'?'selected':''}>Info</option>
    </select>
    <select onchange="APP.setFilter('alerts','cat',this.value);APP.renderCurrent()">
      <option value="all" ${catF==='all'?'selected':''}>All Categories</option>
      <option value="pa" ${catF==='pa'?'selected':''}>Authorization</option>
      <option value="staffing" ${catF==='staffing'?'selected':''}>Staffing</option>
      <option value="compliance" ${catF==='compliance'?'selected':''}>Compliance</option>
    </select>
    <select onchange="APP.setFilter('alerts','status',this.value);APP.renderCurrent()">
      <option value="active" ${stF==='active'?'selected':''}>Active</option>
      <option value="dismissed" ${stF==='dismissed'?'selected':''}>Dismissed</option>
      <option value="resolved" ${stF==='resolved'?'selected':''}>Resolved</option>
    </select>
    <button class="btn btn-sm" onclick="DB.generateAlerts();APP.renderCurrent()"><i class="ti ti-refresh"></i> Refresh</button>
    <span style="font-size:10px;color:var(--text3);margin-left:auto">${filtered.length} alert${filtered.length!==1?'s':''}</span>
  </div>
  ${filtered.length ? filtered.map(a=>`
    <div class="alert-item al-${a.sev==='critical'?'c':a.sev==='warning'?'w':'i'}" onclick="APP.navigate('${a.link||'alerts'}')">
      <i class="ti ti-${a.sev==='critical'?'alert-octagon':a.sev==='warning'?'alert-triangle':'info-circle'} alert-icon"></i>
      <div class="alert-body">
        <div class="alert-title">${a.title}</div>
        <div class="alert-sub">${a.sub}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:2px">${new Date(a.created).toLocaleDateString()} · ${a.status}</div>
      </div>
      <div style="display:flex;gap:4px;flex-shrink:0" onclick="event.stopPropagation()">
        ${a.status==='active'?`
          <button class="btn btn-xs" onclick="APP.alertAction('${a.id}','dismissed')">Dismiss</button>
          <button class="btn btn-xs btn-primary" onclick="APP.alertAction('${a.id}','resolved')">Resolve</button>
        `:`<span class="badge b3">${a.status}</span>`}
      </div>
    </div>`).join('') : '<div class="empty"><i class="ti ti-check"></i><strong>No alerts match filters</strong></div>'}`;
};

// ---- EMPLOYEES ----
VIEWS.employees = () => {
  const st = STATE.getTable('employees');
  let rows = DB.data.employees;
  const q = st.filters.q||'';
  const role = st.filters.role||'';
  const status = st.filters.status||'';
  if(q) rows=rows.filter(e=>`${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(q.toLowerCase()));
  if(role) rows=rows.filter(e=>e.role===role);
  if(status) rows=rows.filter(e=>e.status===status);
  rows = rows.map(e=>({...e,_rel:DB.reliabilityScore(e),_burn:DB.burnoutScore(e),_coord:DB.coordName(e.coordinator)}));

  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search name or email..." value="${q}" oninput="APP.setFilter('employees','q',this.value);APP.setPage('employees',1);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('employees','role',this.value);APP.setPage('employees',1);APP.renderCurrent()">
      <option value="" ${!role?'selected':''}>All Roles</option>
      ${['RN','LPN','HHA','CNA'].map(r=>`<option ${role===r?'selected':''}>${r}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('employees','status',this.value);APP.setPage('employees',1);APP.renderCurrent()">
      <option value="" ${!status?'selected':''}>All Status</option>
      <option ${status==='Active'?'selected':''}>Active</option>
      <option ${status==='Inactive'?'selected':''}>Inactive</option>
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openEmpForm()"><i class="ti ti-plus"></i> Add Employee</button>
  </div>
  <div class="card">
    ${buildTable('employees',
      [{label:'Last Name',field:'lastName'},{label:'First Name',field:'firstName'},{label:'Role',field:'role'},{label:'Status',field:'status'},{label:'Coordinator',field:'_coord'},{label:'Callouts',field:'calloutsMonth'},{label:'OT hrs',field:'otHrsWeek'},{label:'Reliability',field:'_rel'},{label:'Burnout',field:'_burn'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openEmpProfile('${r.id}')">
        <td style="font-weight:500">${r.lastName}</td><td>${r.firstName}</td>
        <td><span class="badge b3">${r.role}</span></td>
        <td><span class="badge ${r.status==='Active'?'bg':'b3'}">${r.status}</span></td>
        <td style="font-size:11px;color:var(--text2)">${r._coord.split(' ')[0]}</td>
        <td><span class="badge ${r.calloutsMonth>=3?'br':r.calloutsMonth>=1?'ba':'bg'}">${r.calloutsMonth}</span></td>
        <td><span class="badge ${r.otHrsWeek>=42?'br':r.otHrsWeek>=38?'ba':'b3'}">${r.otHrsWeek}h</span></td>
        <td><div style="display:flex;align-items:center;gap:4px">${scoreBar(r._rel,false,50)}<span style="font-size:10px;color:${scoreColor(r._rel)}">${r._rel}</span></div></td>
        <td><div style="display:flex;align-items:center;gap:4px">${scoreBar(r._burn,true,50)}<span style="font-size:10px;color:${scoreColor(r._burn,true)}">${r._burn}</span></div></td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openEmpProfile('${r.id}')"><i class="ti ti-eye"></i></button>
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openEmpForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('employees','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- CLIENTS ----
VIEWS.clients = () => {
  const st = STATE.getTable('clients');
  let rows = DB.data.clients;
  const q=st.filters.q||'', coord=st.filters.coord||'', stab=st.filters.stab||'';
  if(q) rows=rows.filter(c=>`${c.firstName} ${c.lastName} ${c.medicaidId}`.toLowerCase().includes(q.toLowerCase()));
  if(coord) rows=rows.filter(c=>c.coordinatorId===coord);
  if(stab) rows=rows.filter(c=>{const s=DB.stabilityScore(c);return stab==='Stable'?s>=70:stab==='Warning'?s>=40&&s<70:s<40;});
  rows=rows.map(c=>({...c,_score:DB.stabilityScore(c),_coord:DB.coordName(c.coordinatorId),_days:DB.daysBetween(c.paExpDate)}));
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search name or Medicaid ID..." value="${q}" oninput="APP.setFilter('clients','q',this.value);APP.setPage('clients',1);APP.renderCurrent()" style="width:220px">
    <select onchange="APP.setFilter('clients','coord',this.value);APP.setPage('clients',1);APP.renderCurrent()">
      <option value="">All Coordinators</option>
      ${DB.data.coordinators.map(c=>`<option value="${c.id}" ${coord===c.id?'selected':''}>${c.name}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('clients','stab',this.value);APP.setPage('clients',1);APP.renderCurrent()">
      <option value="" ${!stab?'selected':''}>All Stability</option>
      ${['Stable','Warning','Critical'].map(s=>`<option ${stab===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openClientForm()"><i class="ti ti-plus"></i> Add Client</button>
  </div>
  <div class="card">
    ${buildTable('clients',
      [{label:'Last Name',field:'lastName'},{label:'First Name',field:'firstName'},{label:'Medicaid ID',field:'medicaidId'},{label:'Coordinator',field:'_coord'},{label:'Auth Type',field:'authType'},{label:'PA Exp Date',field:'paExpDate'},{label:'Stability',field:'_score'},{label:'Open Shifts',field:'openShifts'},{label:'Hospital'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openClientProfile('${r.id}')">
        <td style="font-weight:500">${r.lastName}</td><td>${r.firstName}</td>
        <td style="font-size:11px;color:var(--text2)">${r.medicaidId}</td>
        <td style="font-size:11px">${r._coord.split(' ')[0]}</td>
        <td><span class="badge b3" style="font-size:9px">${r.authType}</span></td>
        <td>${daysBadge(r._days)}</td>
        <td>${riskPill(r._score)}</td>
        <td><span class="badge ${r.openShifts>0?'br':'bg'}">${r.openShifts}</span></td>
        <td>${r.hospitalActive?'<span class="badge ba">Active</span>':'—'}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openClientProfile('${r.id}')"><i class="ti ti-eye"></i></button>
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openClientForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('clients','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- COORDINATORS ----
VIEWS.coordinators = () => {
  const d = DB.data;
  return `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
    <span style="font-size:14px;font-weight:600">Coordinator Performance</span>
    <button class="btn btn-primary btn-sm" onclick="APP.openCoordForm()"><i class="ti ti-plus"></i> Add Coordinator</button>
  </div>
  <div class="g3">
    ${d.coordinators.map(co=>{
      const eff=DB.coordEfficiency(co.id);
      const clients=d.clients.filter(c=>c.coordinatorId===co.id);
      const calls=d.callouts.filter(c=>c.coordinatorId===co.id);
      const openS=d.openShifts.filter(s=>s.coordinatorId===co.id&&s.status==='Open');
      const crit=clients.filter(c=>DB.stabilityScore(c)<40);
      return `<div class="card" style="cursor:pointer" onclick="APP.navigate('employees')">
        <div class="prof-hd" style="padding-bottom:10px;margin-bottom:10px">
          <div class="avatar av-blue">${co.name.split(' ').map(n=>n[0]).join('')}</div>
          <div style="flex:1"><div style="font-weight:600;font-size:13px">${co.name}</div><div style="font-size:10px;color:var(--text3)">${co.email}</div></div>
          <div class="score-ring ${scoreClass(eff)}">${eff}</div>
        </div>
        <div class="g2" style="gap:8px;margin-bottom:10px">
          <div class="stat-box"><div class="sv">${clients.length}</div><div class="sl">Cases</div></div>
          <div class="stat-box"><div class="sv" style="color:${crit.length?'var(--red)':'var(--text)'}">${crit.length}</div><div class="sl">Critical</div></div>
          <div class="stat-box"><div class="sv" style="color:${calls.length>3?'var(--amber)':'var(--text)'}">${calls.length}</div><div class="sl">Callouts</div></div>
          <div class="stat-box"><div class="sv" style="color:${openS.length?'var(--red)':'var(--green)'}">${openS.length}</div><div class="sl">Open Shifts</div></div>
        </div>
        <div class="prog-bar"><div class="prog-fill" style="width:${eff}%;background:${scoreColor(eff)}"></div></div>
        <div style="font-size:10px;color:var(--text3);margin-top:4px">Efficiency: ${eff}/100</div>
        <div style="display:flex;gap:4px;margin-top:10px">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openCoordForm('${co.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('coordinators','${co.id}')"><i class="ti ti-trash"></i></button>
        </div>
      </div>`;}).join('')}
  </div>`;
};

// ---- STAFFING ----
VIEWS.staffing = () => {
  const st=STATE.getTable('staffing');
  let rows=DB.data.openShifts;
  const q=st.filters.q||'',sf=st.filters.status||'',cf=st.filters.coord||'';
  const enriched=rows.map(s=>({...s,_client:DB.clientName(s.clientId),_coord:DB.coordName(s.coordinatorId)}));
  let filtered=enriched;
  if(q)filtered=filtered.filter(s=>(s._client+s._coord).toLowerCase().includes(q.toLowerCase()));
  if(sf)filtered=filtered.filter(s=>s.status===sf);
  if(cf)filtered=filtered.filter(s=>s.coordinatorId===cf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search client or coordinator..." value="${q}" oninput="APP.setFilter('staffing','q',this.value);APP.renderCurrent()" style="width:220px">
    <select onchange="APP.setFilter('staffing','status',this.value);APP.renderCurrent()">
      <option value="">All Status</option>
      ${['Open','Covered','Missed Visit','Pending'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('staffing','coord',this.value);APP.renderCurrent()">
      <option value="">All Coordinators</option>
      ${DB.data.coordinators.map(c=>`<option value="${c.id}" ${cf===c.id?'selected':''}>${c.name}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openShiftForm()"><i class="ti ti-plus"></i> Log Open Shift</button>
  </div>
  <div class="card">
    ${buildTable('staffing',
      [{label:'Date',field:'date'},{label:'Client',field:'_client'},{label:'Coordinator',field:'_coord'},{label:'Shift',field:'shift'},{label:'Type',field:'type'},{label:'Reason'},{label:'Status',field:'status'},{label:'Missed Visit'},{label:'Action'}],
      filtered,
      r=>`<tr>
        <td>${r.date}</td>
        <td style="font-weight:500">${r._client}</td>
        <td style="font-size:11px">${r._coord.split(' ')[0]}</td>
        <td style="font-size:11px">${r.shift}</td>
        <td><span class="badge b3">${r.type}</span></td>
        <td style="font-size:11px;color:var(--text2);max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.reason}">${r.reason}</td>
        <td><span class="badge ${r.status==='Open'?'br':r.status==='Covered'?'bg':r.status==='Missed Visit'?'br':'ba'}">${r.status}</span></td>
        <td>${r.missedVisit?'<span class="badge br">Yes</span>':'—'}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="APP.openShiftForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="APP.deleteRecord('openShifts','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- CALLOUTS ----
VIEWS.callouts = () => {
  const st=STATE.getTable('callouts');
  const q=st.filters.q||'',tf=st.filters.type||'',df=st.filters.date||'';
  let rows=DB.data.callouts.map(c=>({...c,_emp:DB.empName(c.employeeId),_client:DB.clientName(c.clientId),_coord:DB.coordName(c.coordinatorId)}));
  if(q)rows=rows.filter(r=>(r._emp+r._client).toLowerCase().includes(q.toLowerCase()));
  if(tf)rows=rows.filter(r=>r.type===tf);
  if(df)rows=rows.filter(r=>r.date>=df);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search employee or client..." value="${q}" oninput="APP.setFilter('callouts','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('callouts','type',this.value);APP.renderCurrent()">
      <option value="">All Types</option>
      ${['Late (<2hr)','2–4hr Notice','4hr+ Notice','NCNS'].map(t=>`<option ${tf===t?'selected':''}>${t}</option>`).join('')}
    </select>
    <input type="date" value="${df}" onchange="APP.setFilter('callouts','date',this.value);APP.renderCurrent()" title="From date">
    <button class="btn btn-primary btn-sm" onclick="APP.openCalloutForm()"><i class="ti ti-plus"></i> Log Callout</button>
  </div>
  <div class="card">
    ${buildTable('callouts',
      [{label:'Date',field:'date'},{label:'Employee',field:'_emp'},{label:'Client',field:'_client'},{label:'Coordinator',field:'_coord'},{label:'Shift',field:'shift'},{label:'Type',field:'type'},{label:'Notice',field:'noticeHours'},{label:'Covered',field:'covered'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openEmpProfile('${r.employeeId}')">
        <td>${r.date}</td>
        <td style="font-weight:500">${r._emp}</td>
        <td>${r._client}</td>
        <td style="font-size:11px">${r._coord.split(' ')[0]}</td>
        <td style="font-size:11px">${r.shift}</td>
        <td><span class="badge ${r.type==='NCNS'?'br':r.type.startsWith('Late')?'ba':'b3'}">${r.type}</span></td>
        <td style="font-size:11px">${r.noticeHours}h</td>
        <td><span class="badge ${r.covered?'bg':'br'}">${r.covered?'Covered':'Uncovered'}</span></td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openCalloutForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('callouts','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- OVERTIME ----
VIEWS.overtime = () => {
  const st=STATE.getTable('overtime');
  const q=st.filters.q||'',sf=st.filters.status||'';
  let rows=DB.data.overtimes.map(o=>({...o,_emp:DB.empName(o.employeeId),_client:DB.clientName(o.clientId),_total:o.wk1+o.wk2+o.wk3+o.wk4}));
  if(q)rows=rows.filter(r=>r._emp.toLowerCase().includes(q.toLowerCase()));
  if(sf)rows=rows.filter(r=>r.status===sf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search employee..." value="${q}" oninput="APP.setFilter('overtime','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('overtime','status',this.value);APP.renderCurrent()">
      <option value="">All Status</option>
      ${['Approved','Pending Approval','Denied'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openOTForm()"><i class="ti ti-plus"></i> Log OT Entry</button>
  </div>
  <div class="card">
    ${buildTable('overtime',
      [{label:'Employee',field:'_emp'},{label:'Client',field:'_client'},{label:'Wk 1'},{label:'Wk 2'},{label:'Wk 3'},{label:'Wk 4'},{label:'Total',field:'_total'},{label:'Status',field:'status'},{label:'Approved By'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openEmpProfile('${r.employeeId}')">
        <td style="font-weight:500">${r._emp}</td>
        <td style="font-size:11px">${r._client}</td>
        <td>${r.wk1}</td><td>${r.wk2}</td><td>${r.wk3}</td><td>${r.wk4}</td>
        <td style="font-weight:600;color:${r._total>=40?'var(--red)':r._total>=32?'var(--amber)':'var(--text)'}">${r._total}h</td>
        <td><span class="badge ${r.status==='Approved'?'bg':r.status==='Pending Approval'?'ba':'br'}">${r.status}</span></td>
        <td style="font-size:11px;color:var(--text2)">${r.approvedBy||'—'}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openOTForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('overtimes','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- HOSPITAL ----
VIEWS.hospital = () => {
  const st=STATE.getTable('hospital');
  const q=st.filters.q||'',sf=st.filters.status||'';
  let rows=DB.data.hospitalEvents.map(h=>({...h,_client:DB.clientName(h.clientId)}));
  if(q)rows=rows.filter(r=>r._client.toLowerCase().includes(q.toLowerCase()));
  if(sf)rows=rows.filter(r=>r.status===sf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search patient..." value="${q}" oninput="APP.setFilter('hospital','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('hospital','status',this.value);APP.renderCurrent()">
      <option value="">All</option>
      ${['Active','Discharged','Follow-up Needed'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openHospForm()"><i class="ti ti-plus"></i> Log Admission</button>
  </div>
  <div class="card">
    ${buildTable('hospital',
      [{label:'Patient',field:'_client'},{label:'Hospital',field:'hospital'},{label:'Admission',field:'admissionDate'},{label:'Reason'},{label:'Case Manager'},{label:'Discharge'},{label:'Status',field:'status'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openClientProfile('${r.clientId}')">
        <td style="font-weight:500">${r._client}</td>
        <td>${r.hospital}</td>
        <td>${r.admissionDate}</td>
        <td style="font-size:11px;color:var(--text2);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.reason}">${r.reason}</td>
        <td style="font-size:11px">${r.caseManager}</td>
        <td>${r.dischargeDate||'—'}</td>
        <td><span class="badge ${r.status==='Active'?'br':r.status==='Discharged'?'bg':'ba'}">${r.status}</span></td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openHospForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('hospitalEvents','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- AUTHORIZATIONS ----
VIEWS.authorizations = () => {
  const today=new Date();
  const d=DB.data;
  const st=STATE.getTable('authorizations');
  const q=st.filters.q||'',wf=parseInt(st.filters.window||0);
  let rows=d.authorizations.map(a=>{
    const cl=DB.getClient(a.clientId);
    return {...a,_name:cl?`${cl.firstName} ${cl.lastName}`:'Unknown',_mid:cl?cl.medicaidId:'',_days:DB.daysBetween(a.paExpDate)};
  });
  if(q)rows=rows.filter(r=>(r._name+r._mid).toLowerCase().includes(q.toLowerCase()));
  if(wf)rows=rows.filter(r=>r._days<=wf);
  const w30=rows.filter(r=>r._days<=30).length;
  const w60=rows.filter(r=>r._days<=60).length;
  const w90=rows.filter(r=>r._days<=90).length;
  const w120=rows.filter(r=>r._days<=120).length;
  return `
  <div class="g4" style="margin-bottom:14px">
    <div class="kpi" onclick="APP.setFilter('authorizations','window','30');APP.renderCurrent()"><div class="kpi-accent" style="background:var(--red)"></div><div class="kpi-label">≤30 days</div><div class="kpi-val">${d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=30).length}</div><div class="kpi-sub">Critical</div></div>
    <div class="kpi" onclick="APP.setFilter('authorizations','window','60');APP.renderCurrent()"><div class="kpi-accent" style="background:var(--amber)"></div><div class="kpi-label">≤60 days</div><div class="kpi-val">${d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=60).length}</div><div class="kpi-sub">Warning</div></div>
    <div class="kpi" onclick="APP.setFilter('authorizations','window','90');APP.renderCurrent()"><div class="kpi-accent" style="background:var(--blue)"></div><div class="kpi-label">≤90 days</div><div class="kpi-val">${d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=90).length}</div><div class="kpi-sub">Watch</div></div>
    <div class="kpi" onclick="APP.setFilter('authorizations','window','');APP.renderCurrent()"><div class="kpi-accent" style="background:var(--purple)"></div><div class="kpi-label">≤120 days</div><div class="kpi-val">${d.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=120).length}</div><div class="kpi-sub">Monitor</div></div>
  </div>
  <div class="filter-bar">
    <input type="text" placeholder="Search name or Medicaid ID..." value="${q}" oninput="APP.setFilter('authorizations','q',this.value);APP.renderCurrent()" style="width:220px">
    <select onchange="APP.setFilter('authorizations','window',this.value);APP.renderCurrent()">
      <option value="" ${!wf?'selected':''}>All Windows</option>
      ${[30,60,90,120].map(n=>`<option value="${n}" ${wf===n?'selected':''}>≤${n} days</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openAuthForm()"><i class="ti ti-plus"></i> Add Authorization</button>
  </div>
  <div class="card">
    ${buildTable('authorizations',
      [{label:'Client',field:'_name'},{label:'Medicaid ID',field:'_mid'},{label:'Agency'},{label:'CM Contact'},{label:'Waiver'},{label:'PA Exp Date',field:'paExpDate'},{label:'Days Left',field:'_days'},{label:'DCCC',field:'dcccActive'},{label:'ePOF'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openClientProfile('${r.clientId}')">
        <td style="font-weight:500">${r._name}</td>
        <td style="font-size:11px;color:var(--text2)">${r._mid}</td>
        <td style="font-size:11px">${r.agency}</td>
        <td style="font-size:11px">${r.cmContact}<br><span style="color:var(--text3)">${r.cmPhone}</span></td>
        <td>${r.waiver?'<span class="badge bp">Yes</span>':'—'}</td>
        <td style="font-weight:500;color:${r._days<=30?'var(--red)':r._days<=60?'var(--amber)':'var(--text)'}">${r.paExpDate}</td>
        <td>${daysBadge(r._days)}</td>
        <td>${r.dcccActive?'<span class="badge bg">Active</span>':'<span class="badge br">No</span>'}</td>
        <td><span class="badge ${r.epofReceived?'bg':r.epofFaxed?'ba':'br'}">${r.epofReceived?'Received':r.epofFaxed?'Faxed':'Pending'}</span></td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openAuthForm('${r.id}')"><i class="ti ti-edit"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- INCIDENTS ----
VIEWS.incidents = () => {
  const st=STATE.getTable('incidents');
  const q=st.filters.q||'',tf=st.filters.type||'',sf=st.filters.status||'';
  let rows=DB.data.incidents.map(i=>({...i,_client:DB.clientName(i.clientId),_emp:DB.empName(i.employeeId),_coord:DB.coordName(i.assignedTo)}));
  if(q)rows=rows.filter(r=>(r._client+r._emp).toLowerCase().includes(q.toLowerCase()));
  if(tf)rows=rows.filter(r=>r.type===tf);
  if(sf)rows=rows.filter(r=>r.status===sf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search client or staff..." value="${q}" oninput="APP.setFilter('incidents','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('incidents','type',this.value);APP.renderCurrent()">
      <option value="">All Types</option>
      ${['Medication Error','Fall','Behavioral','Complaint','Documentation','Other'].map(t=>`<option ${tf===t?'selected':''}>${t}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('incidents','status',this.value);APP.renderCurrent()">
      <option value="">All Status</option>
      ${['Open','Under Review','Resolved','Escalated'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openIncidentForm()"><i class="ti ti-plus"></i> Report Incident</button>
  </div>
  <div class="card">
    ${buildTable('incidents',
      [{label:'Date',field:'date'},{label:'Type',field:'type'},{label:'Client',field:'_client'},{label:'Staff',field:'_emp'},{label:'Severity',field:'severity'},{label:'Status',field:'status'},{label:'Assigned To'},{label:'Due Date',field:'dueDate'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openIncidentDetail('${r.id}')">
        <td>${r.date}</td>
        <td><span class="badge b3">${r.type}</span></td>
        <td style="font-weight:500">${r._client}</td>
        <td>${r._emp}</td>
        <td><span class="badge ${r.severity==='High'?'br':r.severity==='Medium'?'ba':'b3'}">${r.severity}</span></td>
        <td><span class="badge ${r.status==='Resolved'?'bg':r.status==='Escalated'?'br':r.status==='Under Review'?'ba':'b3'}">${r.status}</span></td>
        <td style="font-size:11px">${r._coord.split(' ')[0]}</td>
        <td style="font-size:11px;color:${DB.daysBetween(r.dueDate)<0?'var(--red)':'var(--text)'}">${r.dueDate}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openIncidentDetail('${r.id}')"><i class="ti ti-eye"></i></button>
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openIncidentForm('${r.id}')"><i class="ti ti-edit"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- CREDENTIALS ----
VIEWS.credentials = () => {
  const st=STATE.getTable('credentials');
  const q=st.filters.q||'',tf=st.filters.type||'',sf=st.filters.status||'';
  let rows=DB.data.credentials.map(c=>{
    const d=DB.daysBetween(c.expiryDate);
    const status=d<0?'Expired':d<=30?'Expiring Soon':'Current';
    return {...c,_emp:DB.empName(c.employeeId),_days:d,_status:status};
  });
  if(q)rows=rows.filter(r=>r._emp.toLowerCase().includes(q.toLowerCase()));
  if(tf)rows=rows.filter(r=>r.type===tf);
  if(sf)rows=rows.filter(r=>r._status===sf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search employee..." value="${q}" oninput="APP.setFilter('credentials','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('credentials','type',this.value);APP.renderCurrent()">
      <option value="">All Types</option>
      ${['CPR','TB Test','Annual Physical','Background Check','State License','Competency'].map(t=>`<option ${tf===t?'selected':''}>${t}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('credentials','status',this.value);APP.renderCurrent()">
      <option value="">All</option>
      ${['Current','Expiring Soon','Expired'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openCredForm()"><i class="ti ti-plus"></i> Add Credential</button>
  </div>
  <div class="card">
    ${buildTable('credentials',
      [{label:'Employee',field:'_emp'},{label:'Type',field:'type'},{label:'Issue Date',field:'issueDate'},{label:'Expiry Date',field:'expiryDate'},{label:'Days Left',field:'_days'},{label:'Status',field:'_status'},{label:'Document'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openEmpProfile('${r.employeeId}')">
        <td style="font-weight:500">${r._emp}</td>
        <td><span class="badge b3">${r.type}</span></td>
        <td>${r.issueDate}</td>
        <td style="color:${r._days<0?'var(--red)':r._days<=30?'var(--amber)':'var(--text)'}">${r.expiryDate}</td>
        <td>${daysBadge(r._days)}</td>
        <td><span class="badge ${r._status==='Current'?'bg':r._status==='Expiring Soon'?'ba':'br'}">${r._status}</span></td>
        <td>${r.document?`<span class="badge bb"><i class="ti ti-file" style="margin-right:3px"></i>${r.document}</span>`:'<span class="badge br">Missing</span>'}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openCredForm('${r.id}')"><i class="ti ti-edit"></i></button>
          <button class="btn btn-xs btn-danger" onclick="event.stopPropagation();APP.deleteRecord('credentials','${r.id}')"><i class="ti ti-trash"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- COMPLAINTS ----
VIEWS.complaints = () => {
  const st=STATE.getTable('complaints');
  const q=st.filters.q||'',sf=st.filters.status||'',srcf=st.filters.source||'';
  let rows=DB.data.complaints.map(c=>({...c,_against:DB.getEmp(c.against)?DB.empName(c.against):c.against,_coord:DB.coordName(c.assignedTo)}));
  if(q)rows=rows.filter(r=>r._against.toLowerCase().includes(q.toLowerCase()));
  if(sf)rows=rows.filter(r=>r.status===sf);
  if(srcf)rows=rows.filter(r=>r.source===srcf);
  return `
  <div class="filter-bar">
    <input type="text" placeholder="Search..." value="${q}" oninput="APP.setFilter('complaints','q',this.value);APP.renderCurrent()" style="width:200px">
    <select onchange="APP.setFilter('complaints','source',this.value);APP.renderCurrent()">
      <option value="">All Sources</option>
      ${['Client/Family','Staff','External'].map(s=>`<option ${srcf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <select onchange="APP.setFilter('complaints','status',this.value);APP.renderCurrent()">
      <option value="">All</option>
      ${['Open','Under Investigation','Resolved'].map(s=>`<option ${sf===s?'selected':''}>${s}</option>`).join('')}
    </select>
    <button class="btn btn-primary btn-sm" onclick="APP.openComplaintForm()"><i class="ti ti-plus"></i> Submit Complaint</button>
  </div>
  <div class="card">
    ${buildTable('complaints',
      [{label:'Date',field:'date'},{label:'Source',field:'source'},{label:'Against',field:'_against'},{label:'Category'},{label:'Priority',field:'priority'},{label:'Status',field:'status'},{label:'Assigned To'},{label:'Resolution'},{label:'Action'}],
      rows,
      r=>`<tr onclick="APP.openComplaintDetail('${r.id}')">
        <td>${r.date}</td>
        <td><span class="badge b3">${r.source}</span></td>
        <td style="font-weight:500">${r._against}</td>
        <td>${r.category}</td>
        <td><span class="badge ${r.priority==='High'?'br':r.priority==='Medium'?'ba':'b3'}">${r.priority}</span></td>
        <td><span class="badge ${r.status==='Resolved'?'bg':r.status==='Under Investigation'?'ba':'b3'}">${r.status}</span></td>
        <td style="font-size:11px">${r._coord.split(' ')[0]}</td>
        <td>${r.resolutionDate||'—'}</td>
        <td><div class="row-actions">
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openComplaintDetail('${r.id}')"><i class="ti ti-eye"></i></button>
          <button class="btn btn-xs" onclick="event.stopPropagation();APP.openComplaintForm('${r.id}')"><i class="ti ti-edit"></i></button>
        </div></td>
      </tr>`
    )}
  </div>`;
};

// ---- ANALYTICS ----
VIEWS.analytics = () => {
  setTimeout(() => {
    // Callout heatmap
    const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const weeks=['W1','W2','W3','W4','W5','W6','W7','W8'];
    const heat=document.getElementById('callout-heatmap');
    if(heat){
      const data=weeks.map(()=>days.map(()=>Math.floor(Math.random()*5)));
      heat.innerHTML='<div style="display:flex;gap:6px;overflow-x:auto;padding:4px">'
        +'<div style="display:flex;flex-direction:column;gap:1px;padding-top:18px">'
        +days.map(d=>`<div style="height:22px;line-height:22px;font-size:10px;color:var(--text3);text-align:right;width:28px;padding-right:4px">${d}</div>`).join('')+'</div>'
        +weeks.map((w,wi)=>`<div><div style="text-align:center;font-size:9px;color:var(--text3);margin-bottom:2px">${w}</div>`
          +days.map((_,di)=>{const v=data[wi][di];const op=[0,.18,.35,.55,.75,1][v];return `<div class="hm-cell" title="${w} ${days[di]}: ${v}" style="background:rgba(248,81,73,${op})"></div>`}).join('')+'</div>').join('')
        +'</div><div style="display:flex;gap:4px;align-items:center;margin-top:8px;font-size:10px;color:var(--text3)"><span>Low</span>'
        +[.18,.35,.55,.75,1].map(o=>`<div style="width:14px;height:14px;border-radius:2px;background:rgba(248,81,73,${o})"></div>`).join('')+'<span>High</span></div>';
    }
    // Charts
    makeChart('analytics-callout-chart',{type:'line',data:{
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'],
      datasets:[{label:'Callouts',data:[8,12,9,15,11,14,10,13],borderColor:'#f85149',backgroundColor:'rgba(248,81,73,.1)',fill:true,tension:.3,pointRadius:3,borderWidth:2}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}}},y:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'rgba(255,255,255,.04)'}}}}});
    makeChart('analytics-ot-chart',{type:'bar',data:{
      labels:['Jan','Feb','Mar','Apr','May'],
      datasets:[{label:'OT Hours',data:[145,162,138,178,155],backgroundColor:'rgba(188,140,255,.6)',borderColor:'#bc8cff',borderWidth:1}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}}},y:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'rgba(255,255,255,.04)'}}}}});
    makeChart('analytics-inc-chart',{type:'doughnut',data:{
      labels:['Med Error','Fall','Behavioral','Documentation','Other'],
      datasets:[{data:[3,2,4,5,1],backgroundColor:['#f85149','#d29922','#bc8cff','#58a6ff','#3fb950'],borderWidth:0}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right',labels:{color:'#8b949e',font:{size:10}}}}}});
    makeChart('analytics-auth-chart',{type:'bar',data:{
      labels:['≤30d','≤60d','≤90d','≤120d'],
      datasets:[{data:[
        DB.data.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=30).length,
        DB.data.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=60).length,
        DB.data.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=90).length,
        DB.data.authorizations.filter(a=>DB.daysBetween(a.paExpDate)<=120).length
      ],backgroundColor:['rgba(248,81,73,.7)','rgba(210,153,34,.7)','rgba(88,166,255,.7)','rgba(188,140,255,.7)'],borderWidth:0}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}}},y:{ticks:{color:'#8b949e',font:{size:10},stepSize:1},grid:{color:'rgba(255,255,255,.04)'}}}}});
  },60);
  return `
  <div class="g2">
    <div class="card"><div class="card-hd"><span class="card-title">Callout Trend — Monthly</span><button class="btn btn-xs" onclick="APP.navigate('callouts')">View Records</button></div><div style="position:relative;height:200px"><canvas id="analytics-callout-chart" role="img" aria-label="Monthly callout trend">Monthly callout data</canvas></div></div>
    <div class="card"><div class="card-hd"><span class="card-title">OT Hours — Monthly</span><button class="btn btn-xs" onclick="APP.navigate('overtime')">View Records</button></div><div style="position:relative;height:200px"><canvas id="analytics-ot-chart" role="img" aria-label="OT hours trend">OT hours data</canvas></div></div>
  </div>
  <div class="g2">
    <div class="card"><div class="card-hd"><span class="card-title">Incident Distribution</span></div><div style="position:relative;height:200px"><canvas id="analytics-inc-chart" role="img" aria-label="Incident types">Incident data</canvas></div></div>
    <div class="card"><div class="card-hd"><span class="card-title">PA Expiration Buckets</span><button class="btn btn-xs" onclick="APP.navigate('authorizations')">Manage</button></div><div style="position:relative;height:200px"><canvas id="analytics-auth-chart" role="img" aria-label="PA expirations">Auth data</canvas></div></div>
  </div>
  <div class="card"><div class="card-hd"><span class="card-title">Callout Heatmap — Day of Week × Week</span><span style="font-size:10px;color:var(--text3)">Darker = more callouts</span></div><div id="callout-heatmap"></div></div>
  <div class="g2">
    <div class="card"><div class="card-hd"><span class="card-title">Coordinator Workload</span></div>
      ${DB.data.coordinators.map(co=>{const load=Math.min(100,Math.round(DB.data.clients.filter(c=>c.coordinatorId===co.id).length*12+DB.data.callouts.filter(c=>c.coordinatorId===co.id).length*8));return `
        <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">
          <div style="width:100px;font-size:12px;flex-shrink:0">${co.name.split(' ')[0]}</div>
          <div class="prog-bar" style="flex:1"><div class="prog-fill" style="width:${load}%;background:${load>=80?'var(--red)':load>=50?'var(--amber)':'var(--blue)'}"></div></div>
          <div style="width:32px;font-size:11px;color:var(--text2)">${load}%</div>
        </div>`}).join('')}
    </div>
    <div class="card"><div class="card-hd"><span class="card-title">Coverage Risk by Client</span></div>
      ${DB.data.clients.map(cl=>{const risk=100-DB.stabilityScore(cl);return `
        <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="APP.openClientProfile('${cl.id}')">
          <div style="width:100px;font-size:12px;flex-shrink:0">${cl.firstName} ${cl.lastName.slice(0,8)}</div>
          <div class="prog-bar" style="flex:1"><div class="prog-fill" style="width:${risk}%;background:${risk>=60?'var(--red)':risk>=35?'var(--amber)':'var(--green)'}"></div></div>
          <div style="width:32px;font-size:11px;color:${risk>=60?'var(--red)':risk>=35?'var(--amber)':'var(--green)'}">${risk}%</div>
        </div>`}).join('')}
    </div>
  </div>`;
};

// ---- REPORTS ----
VIEWS.reports = () => `
  <div class="g3">
    ${[
      {id:'staffing',icon:'ti-users',color:'--blue',title:'Weekly Staffing Stability',desc:'Coverage, open shifts, callouts, stability per coordinator'},
      {id:'ot',icon:'ti-clock',color:'--purple',title:'Monthly Overtime Report',desc:'OT by employee, approval status, burnout flags'},
      {id:'callout',icon:'ti-phone-off',color:'--amber',title:'Callout Trend Report',desc:'Frequency by nurse, NCNS, missed visit correlation'},
      {id:'auth',icon:'ti-clipboard-check',color:'--red',title:'PA Expiration Report',desc:'30/60/90/120-day windows, CM contact, ePOF status'},
      {id:'incidents',icon:'ti-alert-triangle',color:'--red',title:'Incident Analysis',desc:'By type, severity, resolution time, escalation'},
      {id:'coordinator',icon:'ti-id-badge',color:'--cyan',title:'Coordinator Performance',desc:'Caseload, callout response, efficiency scores'}
    ].map(r=>`<div class="card" style="cursor:pointer" onclick="APP.generateReport('${r.id}')">
      <div style="width:32px;height:32px;border-radius:8px;background:rgba(0,0,0,.2);color:var(${r.color});display:flex;align-items:center;justify-content:16px;margin-bottom:8px;font-size:16px;padding:8px"><i class="ti ${r.icon}"></i></div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px">${r.title}</div>
      <div style="font-size:11px;color:var(--text2)">${r.desc}</div>
      <div style="display:flex;gap:6px;margin-top:10px">
        <button class="btn btn-sm" onclick="event.stopPropagation();APP.exportCSV('${r.id}')"><i class="ti ti-download"></i> CSV</button>
        <button class="btn btn-sm" onclick="event.stopPropagation();APP.generateReport('${r.id}')"><i class="ti ti-eye"></i> Preview</button>
      </div>
    </div>`).join('')}
  </div>
  <div id="report-output"></div>`;

// ---- WORKFLOWS ----
VIEWS.workflows = () => {
  const wfs = DB.data.workflows;
  return `
  <div class="notice"><i class="ti ti-git-branch"></i>Workflow pipelines track multi-step processes with assignments, due dates, and escalation triggers.</div>
  <div class="g2">
    <div class="card">
      <div class="card-hd"><span class="card-title">Active Workflows</span><button class="btn btn-primary btn-sm" onclick="APP.openWFModal()"><i class="ti ti-plus"></i> Start Workflow</button></div>
      ${wfs.length?wfs.map(wf=>`
        <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
            <div style="font-size:12px;font-weight:600">${wf.type}</div>
            <span class="badge ${wf.status==='Completed'?'bg':wf.step>0?'ba':'b3'}">${wf.status}</span>
          </div>
          <div style="font-size:11px;color:var(--text2);margin-bottom:8px">${wf.subject}</div>
          <div class="wf-steps">${wf.steps.map((s,i)=>`<div class="wf-step ${i<wf.step?'done':i===wf.step?'current':'pending'}">${s}</div>`).join('')}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px">
            <div style="font-size:10px;color:var(--text3)">Assigned: ${DB.coordName(wf.assignedTo)} · Due: ${wf.dueDate}</div>
            <div style="display:flex;gap:4px">
              ${wf.status!=='Completed'?`<button class="btn btn-xs btn-primary" onclick="APP.advanceWF('${wf.id}')"><i class="ti ti-arrow-right"></i> Advance</button>`:''}
              <button class="btn btn-xs btn-danger" onclick="APP.deleteRecord('workflows','${wf.id}')"><i class="ti ti-trash"></i></button>
            </div>
          </div>
        </div>`).join(''):'<div class="empty"><i class="ti ti-git-branch"></i><strong>No active workflows</strong><p style="font-size:11px;color:var(--text3);margin-top:4px">Start one from the templates →</p></div>'}
    </div>
    <div class="card">
      <div class="card-hd"><span class="card-title">Workflow Templates</span></div>
      ${[
        {type:'Incident Review',icon:'ti-alert-triangle',color:'--red',steps:['Report Filed','Assign Investigator','Investigate','Root Cause','Close']},
        {type:'Authorization Renewal',icon:'ti-clipboard-check',color:'--blue',steps:['Alert Triggered','Contact CM','Submit ePOF','Confirm PA','Update Record']},
        {type:'Credential Renewal',icon:'ti-certificate',color:'--amber',steps:['Alert Triggered','Notify Staff','Collect Document','Verify','File']},
        {type:'Complaint Investigation',icon:'ti-message-report',color:'--purple',steps:['Receive','Assign','Investigate','Resolve','Notify']}
      ].map(t=>`<div style="padding:12px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;margin-bottom:8px;cursor:pointer" onclick="APP.startWorkflow('${t.type}','${t.steps.join('|')}')">
        <div style="font-size:12px;font-weight:600;margin-bottom:3px;color:var(${t.color})"><i class="ti ${t.icon}" style="margin-right:5px"></i>${t.type}</div>
        <div style="font-size:10px;color:var(--text3)">${t.steps.join(' → ')}</div>
      </div>`).join('')}
    </div>
  </div>`;
};

// ---- IMPORT ----
VIEWS.import = () => `
  <div class="g2">
    <div class="card">
      <div class="card-hd"><span class="card-title">CSV Import</span></div>
      <div class="drag-zone" id="drop-zone" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="APP.handleDrop(event)">
        <i class="ti ti-cloud-upload"></i>
        <p style="font-size:12px;color:var(--text2);margin-bottom:6px">Drop CSV or Excel file here</p>
        <small style="color:var(--text3)">Supports .csv</small><br>
        <label style="margin-top:8px;display:inline-block;cursor:pointer"><input type="file" accept=".csv" style="display:none" onchange="APP.handleFile(this)"><span class="btn" style="margin-top:8px">Browse Files</span></label>
      </div>
      <div class="form-group">
        <label class="form-label">Map to Entity</label>
        <select class="form-select" id="import-entity">
          ${['Employees','Clients','Authorizations','Callouts','Open Shifts','OT Records','Hospital Events','Credentials','Incidents'].map(e=>`<option>${e}</option>`).join('')}
        </select>
      </div>
      <button class="btn btn-primary" onclick="APP.processImport()"><i class="ti ti-database-import"></i> Process Import</button>
      <div id="import-preview" style="margin-top:12px"></div>
    </div>
    <div class="card">
      <div class="card-hd"><span class="card-title">Import Rules</span></div>
      <div style="font-size:11px;color:var(--text2);line-height:1.8">
        <div style="font-weight:600;color:var(--text);margin-bottom:8px">Recommended order:</div>
        ${['Authorized Beneficiary Sheet — establishes Medicaid IDs','Payroll Sheet — establishes employee records','Master Schedule — links employees to clients','Callout Log','Open Shift Log','OT Tracker, Call Log, Hospital Log'].map((s,i)=>`
          <div style="display:flex;gap:8px;margin-bottom:4px">
            <span style="background:${i===0?'var(--blue-d)':'var(--bg5)'};color:#fff;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0">${i+1}</span>
            <span>${s}</span>
          </div>`).join('')}
        <div style="margin-top:10px;padding:8px;background:var(--amber-bg);border-radius:6px;color:var(--amber);font-size:10px"><i class="ti ti-alert-triangle"></i> Duplicate detection uses Medicaid ID (clients) and Last, First name (employees). Duplicates are merged automatically.</div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-hd"><span class="card-title">Import History</span></div>
    ${DB.data.importHistory.length?`<div class="tbl-wrap"><table><thead><tr><th>Date/Time</th><th>File</th><th>Entity</th><th>Records</th><th>Imported</th><th>Skipped</th><th>Status</th></tr></thead><tbody>
      ${DB.data.importHistory.map(h=>`<tr><td>${h.datetime}</td><td>${h.file}</td><td>${h.entity}</td><td>${h.records}</td><td>${h.imported}</td><td>${h.skipped}</td><td><span class="badge ${h.status==='Success'?'bg':'br'}">${h.status}</span></td></tr>`).join('')}
    </tbody></table></div>`:'<div class="empty"><i class="ti ti-database-import"></i><strong>No imports yet</strong></div>'}
  </div>
  <div class="card">
    <div class="card-hd"><span class="card-title">Export Data</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${['employees','clients','callouts','authorizations','overtimes','incidents','credentials'].map(e=>`
        <button class="btn" onclick="APP.exportCSV('${e}')"><i class="ti ti-download"></i> ${e.charAt(0).toUpperCase()+e.slice(1)}</button>`).join('')}
    </div>
  </div>`;

// ==================== MAIN APP ====================
const APP = {
  navigate(view, skipHistory=false) {
    if (!document.getElementById('v-'+view)) return;
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('act'));
    document.querySelectorAll('.ni').forEach(n=>n.classList.remove('act'));
    document.getElementById('v-'+view).classList.add('act');
    const ni=document.querySelector(`.ni[data-view="${view}"]`);
    if(ni){ni.classList.add('act');ni.scrollIntoView({block:'nearest'});}
    STATE.currentView=view;
    if(!skipHistory){STATE.history=STATE.history.slice(0,STATE.historyIdx+1);STATE.history.push(view);STATE.historyIdx=STATE.history.length-1;}
    this.updateBreadcrumb(view);
    this.renderCurrent();
  },

  renderCurrent() {
    const view=STATE.currentView;
    const el=document.getElementById('v-'+view);
    if(!el||!VIEWS[view])return;
    el.innerHTML=VIEWS[view]();
    if(view==='executive') setTimeout(()=>this.renderExecChart(),50);
    this.updateBreadcrumb(view);
  },

  renderExecChart() {
    makeChart('exec-chart',{type:'line',data:{
      labels:['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'],
      datasets:[{label:'Callouts',data:[2,4,3,5,3,6,4,5],borderColor:'#f85149',backgroundColor:'rgba(248,81,73,.1)',fill:true,tension:.3,pointRadius:3,borderWidth:2}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#8b949e',font:{size:10}}},y:{ticks:{color:'#8b949e',font:{size:10}},grid:{color:'rgba(255,255,255,.04)'}}}}});
  },

  updateBreadcrumb(view) {
    const names={executive:'Executive Dashboard',intelligence:'Intelligence Engine',alerts:'Alert Center',employees:'Employees',clients:'Clients',coordinators:'Coordinators',staffing:'Staffing & Shifts',callouts:'Callout Tracking',overtime:'Overtime',hospital:'Hospital Events',authorizations:'Authorizations',incidents:'Incidents',credentials:'Credentials',complaints:'Complaints',analytics:'Analytics',reports:'Reports',workflows:'Workflows',import:'Import / Export'};
    document.getElementById('breadcrumb').innerHTML=`<span class="crumb" onclick="APP.navigate('executive')">Home</span><span class="sep">›</span><span class="current">${names[view]||view}</span>`;
  },

  toggleSidebar() {
    const sb=document.getElementById('sb');
    STATE.sidebarCollapsed=!STATE.sidebarCollapsed;
    sb.classList.toggle('collapsed',STATE.sidebarCollapsed);
  },

  setRole(r){STATE.role=r;},
  setFilter(view,key,val){STATE.getTable(view).filters[key]=val;},
  setPage(view,p){const st=STATE.getTable(view);const pages=Math.max(1,Math.ceil(999/st.pageSize));st.page=Math.max(1,Math.min(pages,parseInt(p)||1));this.renderCurrent();},
  sortTable(view,field){const st=STATE.getTable(view);if(st.sort===field)st.sortDir=st.sortDir==='asc'?'desc':'asc';else{st.sort=field;st.sortDir='asc';}this.renderCurrent();},

  switchTab(tabsId,el,paneId) {
    const cont=document.getElementById(tabsId).parentElement||document;
    el.parentElement.querySelectorAll('.tab').forEach(t=>t.classList.remove('act'));
    el.classList.add('act');
    cont.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('act'));
    const pane=document.getElementById(paneId);if(pane)pane.classList.add('act');
  },

  alertAction(id,status){
    const a=DB.data.alerts.find(x=>x.id===id);
    if(a){a.status=status;DB.save();toast(`Alert ${status}`,'success');this.renderCurrent();}
  },

  openModal(html,size=''){openModal(html,size);},
  closeModal(){closeModal();},

  openQuickAdd(){
    openModal(modalShell('Add Record — Select Type',
      `<div class="g3">${[
        {m:'emp',icon:'ti-users',label:'Employee',color:'--blue'},
        {m:'client',icon:'ti-user-heart',label:'Client',color:'--green'},
        {m:'callout',icon:'ti-phone-off',label:'Callout',color:'--amber'},
        {m:'shift',icon:'ti-calendar-x',label:'Open Shift',color:'--red'},
        {m:'auth',icon:'ti-clipboard-check',label:'Authorization',color:'--purple'},
        {m:'incident',icon:'ti-alert-triangle',label:'Incident',color:'--red'},
        {m:'cred',icon:'ti-certificate',label:'Credential',color:'--cyan'},
        {m:'complaint',icon:'ti-message-report',label:'Complaint',color:'--purple'},
        {m:'hosp',icon:'ti-building-hospital',label:'Hospital Event',color:'--amber'}
      ].map(t=>`<div style="padding:14px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;cursor:pointer;text-align:center" onclick="APP.closeModal();APP.open${this._formMap[t.m]}Form()">
        <i class="ti ${t.icon}" style="font-size:22px;color:var(${t.color});display:block;margin-bottom:6px"></i>
        <div style="font-size:12px;font-weight:600">${t.label}</div>
      </div>`).join('')}</div>`, ''));
  },
  _formMap:{emp:'Emp',client:'Client',callout:'Callout',shift:'Shift',auth:'Auth',incident:'Incident',cred:'Cred',complaint:'Complaint',hosp:'Hosp'},

  // ---- EMPLOYEE FORM ----
  openEmpForm(id) {
    const d=DB.data;
    const e=id?DB.getEmp(id):{};const isNew=!id;
    openModal(modalShell(isNew?'Add Employee':'Edit Employee',
      `<div class="form-row">${field('lastName','Last Name','text',[],e.lastName||'',true)}<br>${field('firstName','First Name','text',[],e.firstName||'',true)}</div>
       <div class="form-row">${field('role','Role','select',['RN','LPN','HHA','CNA'],e.role||'RN',true)}${field('status','Status','select',['Active','Inactive'],e.status||'Active')}</div>
       <div class="form-row">${field('coordinatorId','Coordinator','select',d.coordinators.map(c=>({v:c.id,l:c.name})),e.coordinator||'c1')}${field('hireDate','Hire Date','date',[],e.hireDate||'')}</div>
       <div class="form-row">${field('phone','Phone','text',[],e.phone||'')}${field('email','Email','email',[],e.email||'')}</div>
       <div class="form-row">${field('otHrsWeek','OT hrs/week','number',[],e.otHrsWeek||0)}${field('calloutsMonth','Callouts this month','number',[],e.calloutsMonth||0)}</div>
       ${field('notes','Notes','textarea',[],e.notes||'','','Clinical notes, performance flags, etc.')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveEmp('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Add Employee':'Save Changes'}</button>`
    ),'');
  },
  saveEmp(id) {
    if(!validate([['lastName','Last name required'],['firstName','First name required']]))return;
    const d=DB.data;
    const emp={lastName:fv('lastName'),firstName:fv('firstName'),role:fv('role'),status:fv('status'),coordinator:fv('coordinatorId'),hireDate:fv('hireDate'),phone:fv('phone'),email:fv('email'),otHrsWeek:parseFloat(fv('otHrsWeek'))||0,calloutsMonth:parseInt(fv('calloutsMonth'))||0,notes:fv('notes')};
    if(id){Object.assign(DB.getEmp(id),emp);DB.audit('update','employees',id,emp);toast('Employee updated','success');}
    else{const ne={...emp,id:DB.uid(),calloutsYTD:0,ncns:0,incidents:0,skills:[]};d.employees.push(ne);DB.audit('create','employees',ne.id,ne);toast('Employee added','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- CLIENT FORM ----
  openClientForm(id) {
    const d=DB.data;const cl=id?DB.getClient(id):{};const isNew=!id;
    openModal(modalShell(isNew?'Add Client':'Edit Client',
      `<div class="form-row">${field('lastName','Last Name','text',[],cl.lastName||'',true)}${field('firstName','First Name','text',[],cl.firstName||'',true)}</div>
       <div class="form-row">${field('medicaidId','Medicaid ID','text',[],cl.medicaidId||'',true)}${field('coordinatorId','Coordinator','select',d.coordinators.map(c=>({v:c.id,l:c.name})),cl.coordinatorId||'c1')}</div>
       <div class="form-row">${field('authType','Auth Type','select',['24 Hours-Nursing','16 Hours-Nursing','12 Hours-Nursing'],cl.authType||'16 Hours-Nursing')}${field('paExpDate','PA Exp Date','date',[],cl.paExpDate||'',true)}</div>
       <div class="form-row">${field('skills','Skills Required','text',[],cl.skills?(Array.isArray(cl.skills)?cl.skills.join(', '):cl.skills):'')}${field('openShifts','Open Shifts','number',[],cl.openShifts||0)}</div>
       <div class="form-row">${field('waiver','Waiver Case','checkbox',[],cl.waiver||false)}${field('statePlan','State Plan','checkbox',[],cl.statePlan||false)}</div>
       ${field('notes','Notes','textarea',[],cl.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveClient('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Add Client':'Save Changes'}</button>`
    ),'');
  },
  saveClient(id) {
    if(!validate([['lastName','Last name required'],['firstName','First name required'],['medicaidId','Medicaid ID required'],['paExpDate','PA Exp Date required']]))return;
    const d=DB.data;
    const cl={lastName:fv('lastName'),firstName:fv('firstName'),medicaidId:fv('medicaidId'),coordinatorId:fv('coordinatorId'),authType:fv('authType'),paExpDate:fv('paExpDate'),skills:fv('skills').split(',').map(s=>s.trim()).filter(Boolean),openShifts:parseInt(fv('openShifts'))||0,waiver:fv('waiver'),statePlan:fv('statePlan'),notes:fv('notes')};
    if(id){Object.assign(DB.getClient(id),cl);DB.audit('update','clients',id,cl);toast('Client updated','success');}
    else{const nc={...cl,id:DB.uid(),hospitalActive:false,nursesAssigned:[]};d.clients.push(nc);DB.audit('create','clients',nc.id,nc);toast('Client added','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- CALLOUT FORM ----
  openCalloutForm(id) {
    const d=DB.data;const co=id?d.callouts.find(c=>c.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Log Callout':'Edit Callout',
      `<div class="form-row">${field('date','Date','date',[],co.date||new Date().toISOString().split('T')[0],true)}${field('employeeId','Employee','select',d.employees.filter(e=>e.status==='Active').map(e=>({v:e.id,l:`${e.firstName} ${e.lastName}`})),co.employeeId||'',true)}</div>
       <div class="form-row">${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),co.clientId||'')}${field('coordinatorId','Coordinator','select',d.coordinators.map(c=>({v:c.id,l:c.name})),co.coordinatorId||'c1')}</div>
       <div class="form-row">${field('shift','Shift','text',[],co.shift||'',true,'e.g. 7am–7pm')}${field('type','Type','select',['Late (<2hr)','2–4hr Notice','4hr+ Notice','NCNS'],co.type||'Late (<2hr)')}</div>
       <div class="form-row">${field('noticeHours','Hours Notice','number',[],co.noticeHours||0)}${field('covered','Covered?','select',[{v:'true',l:'Yes — Covered'},{v:'false',l:'No — Uncovered'}],co.covered?.toString()||'false')}</div>
       ${field('notes','Notes','textarea',[],co.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveCallout('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Log Callout':'Save Changes'}</button>`
    ),'');
  },
  saveCallout(id) {
    if(!validate([['date','Date required'],['employeeId','Employee required'],['shift','Shift required']]))return;
    const d=DB.data;
    const co={date:fv('date'),employeeId:fv('employeeId'),clientId:fv('clientId'),coordinatorId:fv('coordinatorId'),shift:fv('shift'),type:fv('type'),noticeHours:parseFloat(fv('noticeHours'))||0,covered:fv('covered')==='true',notes:fv('notes')};
    if(id){Object.assign(d.callouts.find(c=>c.id===id),co);toast('Callout updated','success');}
    else{const nc={...co,id:DB.uid()};d.callouts.push(nc);
      const emp=DB.getEmp(co.employeeId);if(emp){emp.calloutsMonth++;emp.calloutsYTD++;}
      DB.generateAlerts();toast('Callout logged','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- SHIFT FORM ----
  openShiftForm(id) {
    const d=DB.data;const s=id?d.openShifts.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Log Open Shift':'Edit Shift',
      `<div class="form-row">${field('date','Date','date',[],s.date||new Date().toISOString().split('T')[0],true)}${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),s.clientId||'',true)}</div>
       <div class="form-row">${field('coordinatorId','Coordinator','select',d.coordinators.map(c=>({v:c.id,l:c.name})),s.coordinatorId||'c1')}${field('shift','Shift Time','text',[],s.shift||'',true,'e.g. 7am–7pm')}</div>
       <div class="form-row">${field('type','Entry Type','select',['OPEN','COVER','PERM','MISSED VISIT'],s.type||'OPEN')}${field('status','Status','select',['Open','Covered','Pending','Missed Visit'],s.status||'Open')}</div>
       ${field('reason','Reason','text',[],s.reason||'')}
       ${field('missedVisit','Mark as Missed Visit','checkbox',[],s.missedVisit||false)}
       ${field('notes','Notes','textarea',[],s.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveShift('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Log Shift':'Save Changes'}</button>`
    ),'');
  },
  saveShift(id) {
    if(!validate([['date','Date required'],['clientId','Client required'],['shift','Shift required']]))return;
    const d=DB.data;
    const s={date:fv('date'),clientId:fv('clientId'),coordinatorId:fv('coordinatorId'),shift:fv('shift'),type:fv('type'),status:fv('status'),reason:fv('reason'),missedVisit:fv('missedVisit'),notes:fv('notes')};
    if(id){Object.assign(d.openShifts.find(x=>x.id===id),s);toast('Shift updated','success');}
    else{const ns={...s,id:DB.uid()};d.openShifts.push(ns);const cl=DB.getClient(s.clientId);if(cl)cl.openShifts++;DB.generateAlerts();toast('Shift logged','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- AUTH FORM ----
  openAuthForm(id) {
    const d=DB.data;const a=id?d.authorizations.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Add Authorization':'Edit Authorization',
      `<div class="form-row">${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),a.clientId||'',true)}${field('agency','Agency','text',[],a.agency||'Nexus Health Solutions')}</div>
       <div class="form-row">${field('cmContact','CM Contact Name','text',[],a.cmContact||'')}${field('cmPhone','CM Phone','text',[],a.cmPhone||'')}</div>
       <div class="form-row">${field('paExpDate','PA Exp Date','date',[],a.paExpDate||'',true)}${field('medicaidExp','Medicaid Exp Date','date',[],a.medicaidExp||'')}</div>
       <div class="form-row">${field('libertyEnd','Liberty Assessment End','date',[],a.libertyEnd||'')}${field('dcccActive','DCCC Active','select',[{v:'true',l:'Yes'},{v:'false',l:'No'}],a.dcccActive?.toString()||'false')}</div>
       <div class="form-row">${field('epofFaxed','ePOF Faxed Date','date',[],a.epofFaxed||'')}${field('epofReceived','ePOF Received Date','date',[],a.epofReceived||'')}</div>
       <div class="form-row">${field('waiver','Waiver','checkbox',[],a.waiver||false)}${field('statePlan','State Plan','checkbox',[],a.statePlan||false)}</div>
       ${field('notes','Notes','textarea',[],a.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveAuth('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Add':'Save Changes'}</button>`
    ),'modal-lg');
  },
  saveAuth(id) {
    if(!validate([['clientId','Client required'],['paExpDate','PA Exp Date required']]))return;
    const d=DB.data;
    const a={clientId:fv('clientId'),agency:fv('agency'),cmContact:fv('cmContact'),cmPhone:fv('cmPhone'),paExpDate:fv('paExpDate'),medicaidExp:fv('medicaidExp'),libertyEnd:fv('libertyEnd'),dcccActive:fv('dcccActive')==='true',epofFaxed:fv('epofFaxed'),epofReceived:fv('epofReceived'),waiver:fv('waiver'),statePlan:fv('statePlan'),notes:fv('notes')};
    if(id){Object.assign(d.authorizations.find(x=>x.id===id),a);toast('Authorization updated','success');}
    else{d.authorizations.push({...a,id:DB.uid()});toast('Authorization added','success');}
    DB.generateAlerts();DB.save();closeModal();this.renderCurrent();
  },

  // ---- INCIDENT FORM ----
  openIncidentForm(id) {
    const d=DB.data;const i=id?d.incidents.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Report Incident':'Edit Incident',
      `<div class="form-row">${field('date','Date','date',[],i.date||new Date().toISOString().split('T')[0],true)}${field('type','Type','select',['Medication Error','Fall','Behavioral','Complaint','Documentation','Other'],i.type||'Other')}</div>
       <div class="form-row">${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),i.clientId||'')}${field('employeeId','Staff','select',d.employees.map(e=>({v:e.id,l:`${e.firstName} ${e.lastName}`})),i.employeeId||'')}</div>
       <div class="form-row">${field('severity','Severity','select',['Low','Medium','High'],i.severity||'Medium')}${field('status','Status','select',['Open','Under Review','Resolved','Escalated'],i.status||'Open')}</div>
       <div class="form-row">${field('assignedTo','Assigned To','select',d.coordinators.map(c=>({v:c.id,l:c.name})),i.assignedTo||'c1')}${field('dueDate','Due Date','date',[],i.dueDate||'')}</div>
       ${field('description','Description','textarea',[],i.description||'','','Detailed description of the incident...')}
       ${field('rootCause','Root Cause','textarea',[],i.rootCause||'')}
       ${field('resolution','Resolution','textarea',[],i.resolution||'')}
       ${field('notes','Additional Notes','textarea',[],i.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveIncident('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Report':'Save'}</button>`
    ),'modal-lg');
  },
  saveIncident(id) {
    if(!validate([['date','Date required'],['description','Description required']]))return;
    const d=DB.data;
    const i={date:fv('date'),type:fv('type'),clientId:fv('clientId'),employeeId:fv('employeeId'),severity:fv('severity'),status:fv('status'),assignedTo:fv('assignedTo'),dueDate:fv('dueDate'),description:fv('description'),rootCause:fv('rootCause'),resolution:fv('resolution'),notes:fv('notes')};
    if(id){Object.assign(d.incidents.find(x=>x.id===id),i);toast('Incident updated','success');}
    else{d.incidents.push({...i,id:DB.uid()});const emp=DB.getEmp(i.employeeId);if(emp)emp.incidents++;toast('Incident reported','success');}
    DB.generateAlerts();DB.save();closeModal();this.renderCurrent();
  },

  // ---- CRED FORM ----
  openCredForm(id) {
    const d=DB.data;const c=id?d.credentials.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Add Credential':'Edit Credential',
      `<div class="form-row">${field('employeeId','Employee','select',d.employees.map(e=>({v:e.id,l:`${e.firstName} ${e.lastName}`})),c.employeeId||'',true)}${field('type','Type','select',['CPR','TB Test','Annual Physical','Background Check','State License','Competency'],c.type||'CPR')}</div>
       <div class="form-row">${field('issueDate','Issue Date','date',[],c.issueDate||'')}${field('expiryDate','Expiry Date','date',[],c.expiryDate||'',true)}</div>
       ${field('document','Document File Name','text',[],c.document||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveCred('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Add':'Save'}</button>`
    ),'');
  },
  saveCred(id) {
    if(!validate([['employeeId','Employee required'],['expiryDate','Expiry date required']]))return;
    const d=DB.data;
    const c={employeeId:fv('employeeId'),type:fv('type'),issueDate:fv('issueDate'),expiryDate:fv('expiryDate'),document:fv('document')};
    if(id){Object.assign(d.credentials.find(x=>x.id===id),c);toast('Credential updated','success');}
    else{d.credentials.push({...c,id:DB.uid()});toast('Credential added','success');}
    DB.generateAlerts();DB.save();closeModal();this.renderCurrent();
  },

  // ---- COMPLAINT FORM ----
  openComplaintForm(id) {
    const d=DB.data;const c=id?d.complaints.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Submit Complaint':'Edit Complaint',
      `<div class="form-row">${field('date','Date','date',[],c.date||new Date().toISOString().split('T')[0],true)}${field('source','Source','select',['Client/Family','Staff','External'],c.source||'Client/Family')}</div>
       <div class="form-row">${field('against','Against (name or entity)','text',[],DB.getEmp(c.against)?DB.empName(c.against):c.against||'')}${field('category','Category','text',[],c.category||'')}</div>
       <div class="form-row">${field('priority','Priority','select',['Low','Medium','High'],c.priority||'Medium')}${field('assignedTo','Assign To','select',d.coordinators.map(co=>({v:co.id,l:co.name})),c.assignedTo||'c1')}</div>
       <div class="form-row">${field('status','Status','select',['Open','Under Investigation','Resolved'],c.status||'Open')}${field('resolutionDate','Resolution Date','date',[],c.resolutionDate||'')}</div>
       ${field('description','Description','textarea',[],c.description||'','','Detailed complaint description...')}
       ${field('notes','Investigation Notes','textarea',[],c.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveComplaint('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Submit':'Save'}</button>`
    ),'modal-lg');
  },
  saveComplaint(id) {
    if(!validate([['date','Date required'],['description','Description required']]))return;
    const d=DB.data;
    const c={date:fv('date'),source:fv('source'),against:fv('against'),category:fv('category'),priority:fv('priority'),assignedTo:fv('assignedTo'),status:fv('status'),resolutionDate:fv('resolutionDate'),description:fv('description'),notes:fv('notes')};
    if(id){Object.assign(d.complaints.find(x=>x.id===id),c);toast('Complaint updated','success');}
    else{d.complaints.push({...c,id:DB.uid()});toast('Complaint submitted','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- HOSP FORM ----
  openHospForm(id) {
    const d=DB.data;const h=id?d.hospitalEvents.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Log Hospital Admission':'Edit Hospital Event',
      `<div class="form-row">${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),h.clientId||'',true)}${field('admissionDate','Admission Date','date',[],h.admissionDate||new Date().toISOString().split('T')[0],true)}</div>
       <div class="form-row">${field('hospital','Hospital Name','text',[],h.hospital||'',true)}${field('floor','Floor / Room','text',[],h.floor||'')}</div>
       <div class="form-row">${field('status','Status','select',['Active','Discharged','Follow-up Needed'],h.status||'Active')}${field('dischargeDate','Discharge Date','date',[],h.dischargeDate||'')}</div>
       <div class="form-row">${field('caseManager','Case Manager','text',[],h.caseManager||'')}${field('cmPhone','CM Phone','text',[],h.cmPhone||'')}</div>
       ${field('reason','Reason for Admission','textarea',[],h.reason||'')}
       ${field('notes','Notes','textarea',[],h.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveHosp('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Log Admission':'Save'}</button>`
    ),'modal-lg');
  },
  saveHosp(id) {
    if(!validate([['clientId','Client required'],['admissionDate','Admission date required'],['hospital','Hospital name required']]))return;
    const d=DB.data;
    const h={clientId:fv('clientId'),admissionDate:fv('admissionDate'),hospital:fv('hospital'),floor:fv('floor'),status:fv('status'),dischargeDate:fv('dischargeDate'),caseManager:fv('caseManager'),cmPhone:fv('cmPhone'),reason:fv('reason'),notes:fv('notes'),scheduledHrs:0};
    if(id){Object.assign(d.hospitalEvents.find(x=>x.id===id),h);toast('Hospital event updated','success');}
    else{d.hospitalEvents.push({...h,id:DB.uid()});const cl=DB.getClient(h.clientId);if(cl)cl.hospitalActive=true;toast('Admission logged','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- OT FORM ----
  openOTForm(id) {
    const d=DB.data;const o=id?d.overtimes.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Log OT Entry':'Edit OT Entry',
      `<div class="form-row">${field('employeeId','Employee','select',d.employees.filter(e=>e.status==='Active').map(e=>({v:e.id,l:`${e.firstName} ${e.lastName}`})),o.employeeId||'',true)}${field('clientId','Client','select',d.clients.map(c=>({v:c.id,l:`${c.firstName} ${c.lastName}`})),o.clientId||'')}</div>
       <div class="form-row">${field('schedule','Schedule','text',[],o.schedule||'')}${field('status','Status','select',['Approved','Pending Approval','Denied'],o.status||'Pending Approval')}</div>
       <div class="form-row form-3">${field('wk1','Week 1 OT hrs','number',[],o.wk1||0)}${field('wk2','Week 2 OT hrs','number',[],o.wk2||0)}${field('wk3','Week 3 OT hrs','number',[],o.wk3||0)}</div>
       <div class="form-row">${field('wk4','Week 4 OT hrs','number',[],o.wk4||0)}${field('approvedBy','Approved By','text',[],o.approvedBy||'')}</div>
       ${field('notes','Notes','textarea',[],o.notes||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveOT('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Log OT':'Save'}</button>`
    ),'');
  },
  saveOT(id) {
    if(!validate([['employeeId','Employee required']]))return;
    const d=DB.data;
    const wk1=parseFloat(fv('wk1'))||0,wk2=parseFloat(fv('wk2'))||0,wk3=parseFloat(fv('wk3'))||0,wk4=parseFloat(fv('wk4'))||0;
    const o={employeeId:fv('employeeId'),clientId:fv('clientId'),schedule:fv('schedule'),wk1,wk2,wk3,wk4,status:fv('status'),approvedBy:fv('approvedBy'),notes:fv('notes')};
    if(id){Object.assign(d.overtimes.find(x=>x.id===id),o);toast('OT entry updated','success');}
    else{d.overtimes.push({...o,id:DB.uid()});toast('OT entry logged','success');}
    const emp=DB.getEmp(o.employeeId);if(emp)emp.otHrsWeek=wk1+wk2+wk3+wk4;
    DB.generateAlerts();DB.save();closeModal();this.renderCurrent();
  },

  // ---- COORD FORM ----
  openCoordForm(id) {
    const d=DB.data;const co=id?d.coordinators.find(x=>x.id===id):{};const isNew=!id;
    openModal(modalShell(isNew?'Add Coordinator':'Edit Coordinator',
      `<div class="form-row">${field('name','Full Name','text',[],co.name||'',true)}${field('email','Email','email',[],co.email||'')}</div>
       ${field('phone','Phone','text',[],co.phone||'')}`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveCoord('${id||''}')"><i class="ti ti-check"></i> ${isNew?'Add':'Save'}</button>`
    ),'');
  },
  saveCoord(id) {
    if(!validate([['name','Name required']]))return;
    const d=DB.data;
    const co={name:fv('name'),email:fv('email'),phone:fv('phone'),active:true};
    if(id){Object.assign(d.coordinators.find(x=>x.id===id),co);toast('Coordinator updated','success');}
    else{d.coordinators.push({...co,id:DB.uid()});toast('Coordinator added','success');}
    DB.save();closeModal();this.renderCurrent();
  },

  // ---- DELETE ----
  deleteRecord(entity,id) {
    if(!confirm('Delete this record? This cannot be undone.'))return;
    DB.data[entity]=DB.data[entity].filter(r=>r.id!==id);
    DB.audit('delete',entity,id,{});DB.save();
    toast('Record deleted','info');this.renderCurrent();
  },

  // ---- PROFILES ----
  openEmpProfile(id) {
    const d=DB.data;const emp=DB.getEmp(id);if(!emp)return;
    const rel=DB.reliabilityScore(emp);const burn=DB.burnoutScore(emp);
    const empCalls=d.callouts.filter(c=>c.employeeId===id);
    const empOT=d.overtimes.filter(o=>o.employeeId===id);
    const empInc=d.incidents.filter(i=>i.employeeId===id);
    const empCreds=d.credentials.filter(c=>c.employeeId===id);
    const empClients=d.clients.filter(c=>c.nursesAssigned&&c.nursesAssigned.includes(id));
    openModal(modalShell(`Employee Profile — ${emp.firstName} ${emp.lastName}`,
      `<div class="prof-hd">
        <div class="avatar av-blue">${emp.firstName[0]}${emp.lastName[0]}</div>
        <div style="flex:1">
          <div style="font-size:15px;font-weight:600">${emp.firstName} ${emp.lastName}</div>
          <div style="font-size:11px;color:var(--text2)">${emp.role} · ${DB.coordName(emp.coordinator)}</div>
          <div style="font-size:10px;color:var(--text3)">Hired: ${emp.hireDate} · ${emp.phone} · ${emp.email}</div>
        </div>
        <div style="display:flex;gap:10px">
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">Reliability</div><div class="score-ring ${scoreClass(rel)}">${rel}</div></div>
          <div style="text-align:center"><div style="font-size:10px;color:var(--text3);margin-bottom:4px">Burnout</div><div class="score-ring ${scoreClass(burn,true)}">${burn}</div></div>
        </div>
      </div>
      <div class="g4" style="margin-bottom:14px">
        <div class="stat-box"><div class="sv" style="color:${emp.calloutsMonth>=3?'var(--red)':emp.calloutsMonth>=1?'var(--amber)':'var(--green)'}">${emp.calloutsMonth}</div><div class="sl">Callouts (30d)</div></div>
        <div class="stat-box"><div class="sv" style="color:${emp.ncns>0?'var(--red)':'var(--text)'}">${emp.ncns}</div><div class="sl">NCNS</div></div>
        <div class="stat-box"><div class="sv" style="color:${emp.otHrsWeek>=42?'var(--red)':emp.otHrsWeek>=38?'var(--amber)':'var(--text)'}">${emp.otHrsWeek}h</div><div class="sl">OT hrs/wk</div></div>
        <div class="stat-box"><div class="sv">${emp.incidents}</div><div class="sl">Incidents</div></div>
      </div>
      ${emp.notes?`<div style="background:var(--bg3);border-radius:6px;padding:10px;margin-bottom:12px;font-size:11px;color:var(--text2)"><i class="ti ti-notes" style="margin-right:4px"></i>${emp.notes}</div>`:''}
      <div class="tabs" id="ep-tabs">
        <div class="tab act" onclick="APP.switchTab('ep-tabs',this,'ep-calls')">Callouts (${empCalls.length})</div>
        <div class="tab" onclick="APP.switchTab('ep-tabs',this,'ep-clients')">Cases (${empClients.length})</div>
        <div class="tab" onclick="APP.switchTab('ep-tabs',this,'ep-inc')">Incidents (${empInc.length})</div>
        <div class="tab" onclick="APP.switchTab('ep-tabs',this,'ep-creds')">Credentials</div>
        <div class="tab" onclick="APP.switchTab('ep-tabs',this,'ep-ot')">Overtime</div>
      </div>
      <div id="ep-calls" class="tab-pane act">
        ${empCalls.length?empCalls.map(c=>`<div class="tl-item"><div class="tl-dot ${c.type==='NCNS'?'tl-red':c.type.startsWith('Late')?'tl-amber':'tl-blue'}"></div><div class="tl-body"><div class="tl-title">${c.type} — ${DB.clientName(c.clientId)} · ${c.shift}</div><div class="tl-meta">${c.date} · ${c.covered?'Covered':'UNCOVERED'} · ${c.notes||''}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-check"></i><strong>No callouts</strong></div>'}
      </div>
      <div id="ep-clients" class="tab-pane">
        ${empClients.length?empClients.map(cl=>`<div class="tl-item"><div class="tl-dot tl-blue"></div><div class="tl-body"><div class="tl-title">${cl.firstName} ${cl.lastName} — ${cl.authType}</div><div class="tl-meta">${DB.coordName(cl.coordinatorId)} · PA Exp: ${cl.paExpDate}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-user-heart"></i><strong>No cases linked</strong></div>'}
      </div>
      <div id="ep-inc" class="tab-pane">
        ${empInc.length?empInc.map(i=>`<div class="tl-item"><div class="tl-dot ${i.severity==='High'?'tl-red':i.severity==='Medium'?'tl-amber':'tl-blue'}"></div><div class="tl-body"><div class="tl-title">${i.type} — ${DB.clientName(i.clientId)}</div><div class="tl-meta">${i.date} · ${i.status} · ${i.description.slice(0,100)}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-check"></i><strong>No incidents</strong></div>'}
      </div>
      <div id="ep-creds" class="tab-pane">
        ${empCreds.length?empCreds.map(c=>{const d2=DB.daysBetween(c.expiryDate);const s=d2<0?'Expired':d2<=30?'Expiring Soon':'Current';return `<div class="tl-item"><div class="tl-dot ${s==='Expired'?'tl-red':s==='Expiring Soon'?'tl-amber':'tl-green'}"></div><div class="tl-body"><div class="tl-title">${c.type}</div><div class="tl-meta">Expires ${c.expiryDate} (${d2<0?Math.abs(d2)+'d overdue':d2+'d'}) · ${s}</div></div></div>`}).join(''):'<div class="empty"><i class="ti ti-certificate"></i><strong>No credentials</strong></div>'}
      </div>
      <div id="ep-ot" class="tab-pane">
        ${empOT.length?empOT.map(o=>`<div class="tl-item"><div class="tl-dot tl-blue"></div><div class="tl-body"><div class="tl-title">${DB.clientName(o.clientId)} — ${o.wk1+o.wk2+o.wk3+o.wk4}h total</div><div class="tl-meta">Wk1:${o.wk1} Wk2:${o.wk2} Wk3:${o.wk3} Wk4:${o.wk4} · ${o.status}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-clock"></i><strong>No OT entries</strong></div>'}
      </div>`,
      `<button class="btn" onclick="APP.closeModal()">Close</button>
       <button class="btn btn-primary" onclick="APP.closeModal();APP.openEmpForm('${id}')"><i class="ti ti-edit"></i> Edit Profile</button>`
    ),'modal-xl');
  },

  openClientProfile(id) {
    const d=DB.data;const cl=DB.getClient(id);if(!cl)return;
    const s=DB.stabilityScore(cl);const days=DB.daysBetween(cl.paExpDate);
    const auth=d.authorizations.find(a=>a.clientId===id);
    const calls=d.callouts.filter(c=>c.clientId===id);
    const shifts=d.openShifts.filter(s=>s.clientId===id);
    const hosp=d.hospitalEvents.filter(h=>h.clientId===id);
    const nurses=(cl.nursesAssigned||[]).map(DB.empName.bind(DB));
    openModal(modalShell(`Client Profile — ${cl.firstName} ${cl.lastName}`,
      `<div class="prof-hd">
        <div class="avatar av-green">${cl.firstName[0]}${cl.lastName[0]}</div>
        <div style="flex:1">
          <div style="font-size:15px;font-weight:600">${cl.firstName} ${cl.lastName}</div>
          <div style="font-size:11px;color:var(--text2)">Medicaid ID: ${cl.medicaidId} · ${DB.coordName(cl.coordinatorId)}</div>
          <div style="font-size:10px;color:var(--text3)">${cl.authType} · Skills: ${Array.isArray(cl.skills)?cl.skills.join(', '):cl.skills}</div>
        </div>
        <div class="score-ring ${scoreClass(s)}">${s}</div>
      </div>
      <div class="g4" style="margin-bottom:14px">
        <div class="stat-box"><div class="sv" style="color:${days<=30?'var(--red)':days<=60?'var(--amber)':'var(--green)'}">${days}d</div><div class="sl">PA Expiration</div></div>
        <div class="stat-box"><div class="sv" style="color:${cl.openShifts>0?'var(--red)':'var(--green)'}">${cl.openShifts}</div><div class="sl">Open Shifts</div></div>
        <div class="stat-box"><div class="sv">${(cl.nursesAssigned||[]).length}</div><div class="sl">Nurses Assigned</div></div>
        <div class="stat-box"><div class="sv" style="color:${cl.hospitalActive?'var(--amber)':'var(--green)'}"><i class="ti ti-${cl.hospitalActive?'building-hospital':'check'}"></i></div><div class="sl">Hospital</div></div>
      </div>
      ${nurses.length?`<div style="margin-bottom:12px"><div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px">Assigned Nurses</div>${nurses.map(n=>`<span class="chip" style="margin-right:4px">${n}</span>`).join('')}</div>`:''}
      ${auth?`<div style="background:var(--bg3);border-radius:6px;padding:10px;margin-bottom:12px;font-size:11px;color:var(--text2)">
        <div style="font-weight:600;margin-bottom:4px;color:var(--text)">Authorization Details</div>
        <div>CM: ${auth.cmContact} ${auth.cmPhone} · DCCC: ${auth.dcccActive?'Active':'Inactive'} · ePOF: ${auth.epofReceived?'Received':auth.epofFaxed?'Faxed':'Pending'}</div>
        ${auth.notes?`<div style="margin-top:4px;color:var(--red)">${auth.notes}</div>`:''}
      </div>`:''}
      ${cl.notes?`<div style="background:var(--bg3);border-radius:6px;padding:10px;margin-bottom:12px;font-size:11px;color:var(--text2)"><i class="ti ti-notes" style="margin-right:4px"></i>${cl.notes}</div>`:''}
      <div class="tabs" id="cp-tabs">
        <div class="tab act" onclick="APP.switchTab('cp-tabs',this,'cp-calls')">Callouts (${calls.length})</div>
        <div class="tab" onclick="APP.switchTab('cp-tabs',this,'cp-shifts')">Open Shifts (${shifts.length})</div>
        <div class="tab" onclick="APP.switchTab('cp-tabs',this,'cp-hosp')">Hospital (${hosp.length})</div>
      </div>
      <div id="cp-calls" class="tab-pane act">
        ${calls.length?calls.map(c=>`<div class="tl-item"><div class="tl-dot ${c.covered?'tl-blue':'tl-red'}"></div><div class="tl-body"><div class="tl-title">${DB.empName(c.employeeId)} — ${c.type}</div><div class="tl-meta">${c.date} · ${c.covered?'Covered':'MISSED VISIT'}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-check"></i><strong>No callouts</strong></div>'}
      </div>
      <div id="cp-shifts" class="tab-pane">
        ${shifts.length?shifts.map(s=>`<div class="tl-item"><div class="tl-dot ${s.status==='Open'?'tl-red':s.status==='Covered'?'tl-green':'tl-amber'}"></div><div class="tl-body"><div class="tl-title">${s.shift} — ${s.type}</div><div class="tl-meta">${s.date} · ${s.status} · ${s.reason}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-check"></i><strong>No open shifts</strong></div>'}
      </div>
      <div id="cp-hosp" class="tab-pane">
        ${hosp.length?hosp.map(h=>`<div class="tl-item"><div class="tl-dot tl-amber"></div><div class="tl-body"><div class="tl-title">${h.hospital} — ${h.status}</div><div class="tl-meta">Admitted: ${h.admissionDate} · ${h.reason}</div></div></div>`).join(''):'<div class="empty"><i class="ti ti-check"></i><strong>No hospital events</strong></div>'}
      </div>`,
      `<button class="btn" onclick="APP.closeModal()">Close</button>
       <button class="btn btn-primary" onclick="APP.closeModal();APP.openClientForm('${id}')"><i class="ti ti-edit"></i> Edit Client</button>`
    ),'modal-xl');
  },

  openIncidentDetail(id) {
    const i=DB.data.incidents.find(x=>x.id===id);if(!i)return;
    const wfSteps=['Report Filed','Assign Investigator','Investigate','Root Cause','Close'];
    const step=i.status==='Open'?0:i.status==='Under Review'?2:i.status==='Resolved'?4:3;
    openModal(modalShell(`Incident Detail — ${i.type}`,
      `<div style="display:flex;gap:12px;margin-bottom:14px">
        <div class="avatar av-amber"><i class="ti ti-alert-triangle"></i></div>
        <div>
          <div style="font-size:13px;font-weight:600">${i.type}</div>
          <div style="font-size:11px;color:var(--text2)">Client: ${DB.clientName(i.clientId)} · Staff: ${DB.empName(i.employeeId)}</div>
          <div style="font-size:10px;color:var(--text3)">Date: ${i.date} · Due: ${i.dueDate} · Assigned: ${DB.coordName(i.assignedTo)}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:6px">
          <span class="badge ${i.severity==='High'?'br':i.severity==='Medium'?'ba':'b3'}">${i.severity}</span>
          <span class="badge ${i.status==='Resolved'?'bg':i.status==='Escalated'?'br':'ba'}">${i.status}</span>
        </div>
      </div>
      <div class="wf-steps" style="margin-bottom:14px">${wfSteps.map((s,idx)=>`<div class="wf-step ${idx<step?'done':idx===step?'current':'pending'}">${s}</div>`).join('')}</div>
      <div style="margin-bottom:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px">Description</div><div style="font-size:12px;background:var(--bg3);padding:10px;border-radius:6px">${i.description}</div></div>
      ${i.rootCause?`<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px">Root Cause</div><div style="font-size:12px;background:var(--bg3);padding:10px;border-radius:6px">${i.rootCause}</div></div>`:''}
      ${i.resolution?`<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px">Resolution</div><div style="font-size:12px;background:var(--bg3);padding:10px;border-radius:6px">${i.resolution}</div></div>`:''}
      ${i.notes?`<div style="font-size:11px;color:var(--text2);background:var(--bg3);padding:10px;border-radius:6px">${i.notes}</div>`:''}`,
      `<button class="btn" onclick="APP.closeModal()">Close</button>
       <button class="btn btn-primary" onclick="APP.closeModal();APP.openIncidentForm('${id}')"><i class="ti ti-edit"></i> Edit</button>
       ${i.status!=='Resolved'?`<button class="btn btn-danger" onclick="APP.resolveIncident('${id}')"><i class="ti ti-check"></i> Resolve</button>`:''}`
    ),'modal-lg');
  },

  resolveIncident(id) {
    const i=DB.data.incidents.find(x=>x.id===id);if(i){i.status='Resolved';DB.save();closeModal();this.renderCurrent();toast('Incident resolved','success');}
  },

  openComplaintDetail(id) {
    const c=DB.data.complaints.find(x=>x.id===id);if(!c)return;
    openModal(modalShell('Complaint Detail',
      `<div style="margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
          <span class="badge b3">${c.source}</span>
          <span class="badge ${c.priority==='High'?'br':c.priority==='Medium'?'ba':'b3'}">${c.priority}</span>
          <span class="badge ${c.status==='Resolved'?'bg':c.status==='Under Investigation'?'ba':'b3'}">${c.status}</span>
        </div>
        <div style="font-size:12px;font-weight:600">Against: ${DB.getEmp(c.against)?DB.empName(c.against):c.against}</div>
        <div style="font-size:10px;color:var(--text3)">Category: ${c.category} · Date: ${c.date} · Assigned: ${DB.coordName(c.assignedTo)}</div>
      </div>
      <div style="margin-bottom:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px">Description</div><div style="font-size:12px;background:var(--bg3);padding:10px;border-radius:6px">${c.description}</div></div>
      ${c.notes?`<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.4px">Investigation Notes</div><div style="font-size:12px;background:var(--bg3);padding:10px;border-radius:6px">${c.notes}</div></div>`:''}`,
      `<button class="btn" onclick="APP.closeModal()">Close</button>
       <button class="btn btn-primary" onclick="APP.closeModal();APP.openComplaintForm('${id}')"><i class="ti ti-edit"></i> Edit</button>`
    ),'modal-lg');
  },

  // ---- SEARCH ----
  search(q) {
    const el=document.getElementById('search-results');
    if(!q||q.length<2){el.classList.remove('open');return;}
    const ql=q.toLowerCase();
    const results=[];
    DB.data.employees.filter(e=>`${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(ql)).forEach(e=>results.push({type:'Employee',label:`${e.firstName} ${e.lastName}`,sub:e.role,action:`APP.openEmpProfile('${e.id}')`,color:'--blue'}));
    DB.data.clients.filter(c=>`${c.firstName} ${c.lastName} ${c.medicaidId}`.toLowerCase().includes(ql)).forEach(c=>results.push({type:'Client',label:`${c.firstName} ${c.lastName}`,sub:c.medicaidId,action:`APP.openClientProfile('${c.id}')`,color:'--green'}));
    DB.data.incidents.filter(i=>i.description.toLowerCase().includes(ql)||i.type.toLowerCase().includes(ql)).forEach(i=>results.push({type:'Incident',label:i.type,sub:`${DB.clientName(i.clientId)} · ${i.date}`,action:`APP.openIncidentDetail('${i.id}')`,color:'--red'}));
    DB.data.coordinators.filter(c=>c.name.toLowerCase().includes(ql)).forEach(c=>results.push({type:'Coordinator',label:c.name,sub:c.email,action:`APP.navigate('coordinators')`,color:'--purple'}));
    if(!results.length){el.innerHTML='<div style="padding:12px;font-size:12px;color:var(--text3)">No results found</div>';el.classList.add('open');return;}
    el.innerHTML=results.slice(0,8).map(r=>`<div class="sr-item" onclick="${r.action};document.getElementById('search-results').classList.remove('open');document.getElementById('global-search').value=''">
      <span class="sr-type" style="background:var(${r.color}20);color:var(${r.color})">${r.type}</span>
      <div><div style="font-size:12px;font-weight:500">${r.label}</div><div style="font-size:10px;color:var(--text3)">${r.sub}</div></div>
    </div>`).join('');
    el.classList.add('open');
  },

  // ---- REPORTS ----
  generateReport(type) {
    const d=DB.data;let html='';
    const hdr=(t)=>`<div class="card" style="margin-top:12px"><div class="card-hd"><span class="card-title">${t} — ${new Date().toLocaleDateString()}</span><div style="display:flex;gap:6px"><button class="btn btn-sm" onclick="APP.exportCSV('${type}')"><i class="ti ti-download"></i> CSV</button><button class="btn btn-sm" onclick="window.print()"><i class="ti ti-printer"></i> Print</button><button class="btn btn-xs btn-ghost" onclick="document.getElementById('report-output').innerHTML=''"><i class="ti ti-x"></i></button></div></div>`;
    if(type==='callout'){
      html=hdr('Callout Trend Report')+'<div class="tbl-wrap"><table><thead><tr><th>Employee</th><th>Role</th><th>Total Callouts</th><th>NCNS</th><th>Late (&lt;2hr)</th><th>Covered</th><th>Uncovered</th><th>Reliability</th></tr></thead><tbody>'
        +d.employees.filter(e=>e.status==='Active').map(emp=>{const calls=d.callouts.filter(c=>c.employeeId===emp.id);const rel=DB.reliabilityScore(emp);return `<tr onclick="APP.openEmpProfile('${emp.id}')"><td>${emp.firstName} ${emp.lastName}</td><td><span class="badge b3">${emp.role}</span></td><td>${emp.calloutsMonth}</td><td><span class="badge ${emp.ncns>0?'br':'b3'}">${emp.ncns}</span></td><td>${calls.filter(c=>c.type.startsWith('Late')).length}</td><td>${calls.filter(c=>c.covered).length}</td><td><span class="badge ${calls.filter(c=>!c.covered).length>0?'br':'bg'}">${calls.filter(c=>!c.covered).length}</span></td><td>${riskPill(rel)}</td></tr>`;}).join('')+'</tbody></table></div></div>';
    } else if(type==='auth'){
      html=hdr('PA Expiration Report')+'<div class="tbl-wrap"><table><thead><tr><th>Client</th><th>Medicaid ID</th><th>PA Exp Date</th><th>Days Left</th><th>Waiver</th><th>DCCC</th><th>ePOF</th><th>CM Contact</th></tr></thead><tbody>'
        +d.authorizations.map(a=>{const cl=DB.getClient(a.clientId);const days=DB.daysBetween(a.paExpDate);return `<tr onclick="APP.openClientProfile('${a.clientId}')"><td>${cl?cl.firstName+' '+cl.lastName:'Unknown'}</td><td style="font-size:11px">${cl?cl.medicaidId:''}</td><td style="color:${days<=30?'var(--red)':days<=60?'var(--amber)':'var(--text)'}">${a.paExpDate}</td><td>${daysBadge(days)}</td><td>${a.waiver?'Yes':'No'}</td><td>${a.dcccActive?'Active':'No'}</td><td>${a.epofReceived?'Received':a.epofFaxed?'Faxed':'Pending'}</td><td style="font-size:10px">${a.cmContact} ${a.cmPhone}</td></tr>`;}).join('')+'</tbody></table></div></div>';
    } else {
      html=hdr(type.charAt(0).toUpperCase()+type.slice(1)+' Report')+`<div style="padding:12px;font-size:12px;color:var(--text2)">Report generated. Showing ${d.employees.length} employees, ${d.clients.length} clients, ${d.callouts.length} callouts. Download CSV for full data.</div></div>`;
    }
    document.getElementById('report-output').innerHTML=html;
    document.getElementById('report-output').scrollIntoView({behavior:'smooth'});
  },

  exportCSV(entity) {
    const d=DB.data;let rows=[],headers=[];
    const map={employees:['Last Name','First Name','Role','Status','Callouts','OT hrs','Hire Date'],
      clients:['Last Name','First Name','Medicaid ID','Auth Type','PA Exp Date','Open Shifts'],
      callouts:['Date','Employee','Client','Coordinator','Shift','Type','Notice hrs','Covered'],
      authorizations:['Client','Medicaid ID','Agency','PA Exp Date','Medicaid Exp','Waiver','DCCC'],
      overtimes:['Employee','Client','Wk1','Wk2','Wk3','Wk4','Total','Status'],
      incidents:['Date','Type','Client','Staff','Severity','Status','Assigned To'],
      credentials:['Employee','Type','Issue Date','Expiry Date'],
      staffing:['Date','Client','Coordinator','Shift','Type','Status','Missed Visit']};
    headers=map[entity]||['ID'];
    const entityMap={employees:d.employees.map(e=>[e.lastName,e.firstName,e.role,e.status,e.calloutsMonth,e.otHrsWeek,e.hireDate]),
      clients:d.clients.map(c=>[c.lastName,c.firstName,c.medicaidId,c.authType,c.paExpDate,c.openShifts]),
      callouts:d.callouts.map(c=>[c.date,DB.empName(c.employeeId),DB.clientName(c.clientId),DB.coordName(c.coordinatorId),c.shift,c.type,c.noticeHours,c.covered]),
      authorizations:d.authorizations.map(a=>[DB.clientName(a.clientId),DB.getClient(a.clientId)?.medicaidId,a.agency,a.paExpDate,a.medicaidExp,a.waiver,a.dcccActive]),
      overtimes:d.overtimes.map(o=>[DB.empName(o.employeeId),DB.clientName(o.clientId),o.wk1,o.wk2,o.wk3,o.wk4,o.wk1+o.wk2+o.wk3+o.wk4,o.status]),
      incidents:d.incidents.map(i=>[i.date,i.type,DB.clientName(i.clientId),DB.empName(i.employeeId),i.severity,i.status,DB.coordName(i.assignedTo)]),
      credentials:d.credentials.map(c=>[DB.empName(c.employeeId),c.type,c.issueDate,c.expiryDate])};
    rows=entityMap[entity]||[];
    const csv=[headers,...rows].map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');
    const link=document.createElement('a');link.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);link.download=`nexus_${entity}_${Date.now()}.csv`;link.click();
    toast(`Exported ${rows.length} ${entity} records`,'success');
  },

  // ---- WORKFLOWS ----
  startWorkflow(type, stepsStr) {
    const steps=stepsStr.split('|');
    DB.data.workflows.push({id:DB.uid(),type,subject:'New '+type,status:'In Progress',step:0,steps,assignedTo:'c1',dueDate:'',created:new Date().toISOString().split('T')[0]});
    DB.save();this.renderCurrent();toast('Workflow started','success');
  },
  advanceWF(id) {
    const wf=DB.data.workflows.find(x=>x.id===id);
    if(wf&&wf.step<wf.steps.length-1){wf.step++;if(wf.step===wf.steps.length-1)wf.status='Completed';DB.save();this.renderCurrent();toast('Workflow advanced','success');}
  },
  openWFModal() {
    openModal(modalShell('Start Workflow',
      `<div class="form-row">${field('wfType','Workflow Type','select',['Incident Review','Authorization Renewal','Credential Renewal','Complaint Investigation'],'')}${field('wfSubject','Subject','text',[],'',false,'Brief description...')}</div>
       <div class="form-row">${field('wfCoord','Assign To','select',DB.data.coordinators.map(c=>({v:c.id,l:c.name})),'c1')}${field('wfDue','Due Date','date',[])}</div>`,
      `<button class="btn" onclick="APP.closeModal()">Cancel</button>
       <button class="btn btn-primary" onclick="APP.saveWF()"><i class="ti ti-check"></i> Start</button>`
    ),'');
  },
  saveWF() {
    const types={'Incident Review':'Report Filed|Assign Investigator|Investigate|Root Cause|Close','Authorization Renewal':'Alert Triggered|Contact CM|Submit ePOF|Confirm PA|Update Record','Credential Renewal':'Alert Triggered|Notify Staff|Collect Document|Verify|File','Complaint Investigation':'Receive|Assign|Investigate|Resolve|Notify'};
    const type=fv('wfType');
    DB.data.workflows.push({id:DB.uid(),type,subject:fv('wfSubject')||'New '+type,status:'In Progress',step:0,steps:types[type].split('|'),assignedTo:fv('wfCoord'),dueDate:fv('wfDue'),created:new Date().toISOString().split('T')[0]});
    DB.save();closeModal();this.renderCurrent();toast('Workflow started','success');
  },

  // ---- IMPORT ----
  handleDrop(e) {e.preventDefault();document.getElementById('drop-zone').classList.remove('dragging');const f=e.dataTransfer.files[0];if(f)this._previewFile(f);},
  handleFile(inp) {if(inp.files[0])this._previewFile(inp.files[0]);},
  _previewFile(f) {
    const prev=document.getElementById('import-preview');
    if(!f.name.endsWith('.csv')){toast('Only CSV files supported','error');return;}
    const reader=new FileReader();
    reader.onload=e=>{
      const lines=e.target.result.split('\n').slice(0,6);
      prev.innerHTML=`<div style="background:var(--bg3);border-radius:6px;padding:10px;font-size:11px"><div style="font-weight:600;margin-bottom:6px">Preview: ${f.name}</div><div style="overflow-x:auto"><table style="font-size:10px">${lines.map((l,i)=>`<tr style="${i===0?'color:var(--text3)':''}">${l.split(',').map(c=>`<td style="padding:3px 6px;border:1px solid var(--border);white-space:nowrap">${c}</td>`).join('')}</tr>`).join('')}</table></div></div>`;
      APP._pendingFile={name:f.name,content:e.target.result};
    };
    reader.readAsText(f);
  },
  processImport() {
    const f=this._pendingFile;const entity=document.getElementById('import-entity')?.value||'Employees';
    if(!f){toast('No file selected','error');return;}
    const lines=f.content.split('\n').filter(l=>l.trim());
    const records=lines.length-1;
    DB.data.importHistory.unshift({id:DB.uid(),datetime:new Date().toLocaleString(),file:f.name,entity,records,imported:records,skipped:0,status:'Success'});
    this._pendingFile=null;
    DB.save();
    toast(`Imported ${records} records from ${f.name}`,'success');
    document.getElementById('import-preview').innerHTML='';
    this.renderCurrent();
  }
};

// ==================== SIDEBAR NAV ====================
document.querySelectorAll('.ni[data-view]').forEach(el=>{
  el.addEventListener('click',()=>APP.navigate(el.dataset.view));
});

// ==================== INIT ====================
DB.generateAlerts();
APP.navigate('executive');
document.getElementById('sb-alert-ct').textContent=DB.data.alerts.filter(a=>a.status==='active'&&a.sev==='critical').length;
</script>
</body>
</html>
