import { useState, useEffect } from 'react';
import { Icons } from './components/Icons.jsx';

const translations = {
    tr: {
        title: "Property Manager", searchPlaceholder: "Site Ara...", generalPortfolio: "Genel Portföy",
        sitesProperties: "SİTELER VE MÜLKLER", portfolioStatus: "Genel Portföy Durumu", portfolioSub: "Yönetmek istediğiniz siteyi sol menüden seçin.",
        noCommunity: "Kayıtlı Site Bulunmuyor", noCommunitySub: "Başlamak için sol taraftan ilk sitenizi ekleyin.",
        units: "Daire / Ünite", totalExpense: "Toplam Harcama", aptsAndOrders: "Daireler ve Mevcut İş Emirleri",
        addAptTitle: "Yeni Daire Ekle", aptNoPlaceholder: "Daire Adı/No (Örn: A2)", addBtn: "Ekle",
        noItems: "Kayıtlı iş emri veya fatura yok", detailsAndOrder: "Detaylar ve Kayıt Ekle →",
        workOrders: "İş Emri", total: "Toplam Maliyet", todo: "Yapılacak", inProgress: "Devam Ediyor", complete: "Tamamlandı",
        saveOrder: "İş Emrini Kaydet", updateOrder: "İş Emrini Güncelle", cancelEdit: "İptal",
        cancel: "İptal Et", googleLogin: "Google ile Giriş Yap", siteNamePlaceholder: "Yeni Site Adı Yazın...",
        confirmDelComm: "Bu siteyi ve içindeki TÜM daireleri silmek istediğinize emin misiniz?",
        confirmDelApt: "Bu daireyi ve TÜM kayıtları silmek istediğinize emin misiniz?",
        confirmDelItem: "Bu iş emrini silmek istediğinize emin misiniz?",
        category: "Kategori", jobTitle: "İşlem Başlığı / Alınan Eşya", price: "Tutar ($)", dateTime: "Tarih ve Saat",
        catGeneral: "Genel Bakım", catAppliance: "Beyaz Eşya", catPlumbing: "Tesisat", catElectrical: "Elektrik", catFlooring: "Zemin Tamiri", catHVAC: "Klima", catOther: "Diğer",
        descPlaceholder: "Sorunu, yapılan işlemi detaylıca yazın...", attachments: "Ekli Belgeler",
        uploadFile: "Medya / Dosya Yükle", notes: "Notlar ve Detaylı Açıklama",
        fileLimitsInfo: "Maksimum 6 Dosya • Max 15MB", activeUnitsTitle: "Aktif Daire Özeti", searchActiveUnits: "Daire ara...",
        priority: "Öncelik", prioLow: "Düşük", prioNormal: "Normal", prioHigh: "Yüksek", prioEmergency: "Acil",
        vendor: "Atanan Görevli / Firma", vendorPlaceholder: "Örn: Ahmet Usta",
        materialCost: "Malzeme Maliyeti ($)", laborCost: "İşçilik Ücreti ($)", totalCost: "Genel Toplam:",
        entryPermission: "Kiracı yokken daireye girilebilir", status: "Durum",
        totalSites: "Toplam Siteler", totalApts: "Toplam Daire", pendingTasks: "Bekleyen İşler",
        urgentTasksTitle: "Dikkat Gerektiren İşler (Acil & Yüksek)", urgentBadge: "ACİL", highBadge: "YÜKSEK", noUrgentTasks: "Şu an acil veya yüksek öncelikli bir iş emri bulunmuyor.",
        vendorLabel: "Görevli", permissionLabel: "İzin Durumu", granted: "İzin Var", required: "Gerekli",
        outsourced: "Dışarıdan (Outsource)", aiSuggestBtn: "✨ AI ile Bölgedeki Firmaları Bul", aiSearching: "Yapay zeka bölgeyi tarıyor...",
        radius: "Mesafe (Mil):", selectBtn: "Seç", noVendorsFound: "Bu mesafede ve kategoride firma bulunamadı.", miles: "mil",
        duplicateComm: "Bu isimde bir site zaten kayıtlı!", duplicateApt: "Bu isimde bir daire zaten kayıtlı!",
        createWorkItem: "Yeni İş Emri Oluştur", saving: "Kaydediliyor...",
        attachmentName: "Ek Dosya", logout: "Çıkış Yap",
        statsTitle: "Mini İstatistik", occupancyRate: "Toplam Doluluk Oranı", completionRate: "Tamamlanan İşlem Oranı",
        helpSupport: "Yardım ve Destek", howToUse: "Sistemi nasıl kullanırım?", contactSupport: "Destek ile İletişime Geç",
        quickActions: "Hızlı İşlemler", newVendor: "Yeni Görevli / Tedarikçi Ekle", genReport: "Genel Rapor Oluştur", sendNotice: "Kiracılara Duyuru Gönder",
        emptyPortfolioTitle: "Portföyünüz şu an boş.", emptyPortfolioSub: "Sol taraftaki menüden ilk sitenizi ekleyerek yönetmeye başlayın!",
        close: "Kapat", comingSoon: "Bu özellik çok yakında tam entegre edilecektir."
    },
    en: {
        title: "Property Manager", searchPlaceholder: "Search Site...", generalPortfolio: "General Portfolio",
        sitesProperties: "SITES AND PROPERTIES", portfolioStatus: "Global Portfolio Overview", portfolioSub: "Select a community from the left menu.",
        noCommunity: "No Registered Communities", noCommunitySub: "Add your first community from the left menu to begin.",
        units: "Units", totalExpense: "Total Expense", aptsAndOrders: "Units & Work Orders",
        addAptTitle: "Add New Unit", aptNoPlaceholder: "Unit Name/No (e.g., A2)", addBtn: "Add",
        noItems: "No registered work orders or invoices", detailsAndOrder: "Details & Add Record →",
        workOrders: "Work Orders", total: "Total Cost", todo: "To Do", inProgress: "In Progress", complete: "Complete",
        saveOrder: "Save Work Order", updateOrder: "Update Work Order", cancelEdit: "Cancel",
        cancel: "Cancel", googleLogin: "Sign in with Google", siteNamePlaceholder: "Type New Site Name...",
        confirmDelComm: "Are you sure you want to delete this community and ALL its units?",
        confirmDelApt: "Are you sure you want to delete this unit and ALL its records?",
        confirmDelItem: "Are you sure you want to delete this work order?",
        category: "Category", jobTitle: "Job Title / Item Bought", price: "Amount ($)", dateTime: "Date and Time",
        catGeneral: "General Maintenance", catAppliance: "Appliance", catPlumbing: "Plumbing", catElectrical: "Electrical", catFlooring: "Flooring", catHVAC: "HVAC", catOther: "Other",
        descPlaceholder: "Describe the issue or action taken in detail...", attachments: "Attached Files",
        uploadFile: "Upload Media / File", notes: "Notes & Detailed Description",
        fileLimitsInfo: "Max 6 Files • Max 15MB", activeUnitsTitle: "Active Units Summary", searchActiveUnits: "Search units...",
        priority: "Priority", prioLow: "Low", prioNormal: "Normal", prioHigh: "High", prioEmergency: "Emergency",
        vendor: "Assigned Vendor", vendorPlaceholder: "e.g., John Doe",
        materialCost: "Material ($)", laborCost: "Labor ($)", totalCost: "Grand Total:",
        entryPermission: "Entry Permission Granted", status: "Status",
        totalSites: "Total Sites", totalApts: "Total Units", pendingTasks: "Pending Tasks",
        urgentTasksTitle: "Attention Required (Urgent & High)", urgentBadge: "URGENT", highBadge: "HIGH", noUrgentTasks: "No urgent or high priority work orders at this time.",
        vendorLabel: "Vendor", permissionLabel: "Permission", granted: "Granted", required: "Required",
        outsourced: "Outsourced", aiSuggestBtn: "✨ Find Local Vendors with AI", aiSearching: "AI is scanning the area...",
        radius: "Radius (Miles):", selectBtn: "Select", noVendorsFound: "No vendors found for this category and radius.", miles: "mi",
        duplicateComm: "A community with this name already exists!", duplicateApt: "An apartment with this name already exists!",
        createWorkItem: "Create Work Item", saving: "Saving...",
        attachmentName: "Attachment", logout: "Logout",
        statsTitle: "Mini Statistics", occupancyRate: "Total Occupancy Rate", completionRate: "Completion Rate",
        helpSupport: "Help & Support", howToUse: "How do I use the system?", contactSupport: "Contact Support",
        quickActions: "Quick Actions", newVendor: "Add New Vendor / Supplier", genReport: "Generate Report", sendNotice: "Send Notice to Tenants",
        emptyPortfolioTitle: "Your portfolio is currently empty.", emptyPortfolioSub: "Add your first community from the left menu to start managing!",
        close: "Close", comingSoon: "This feature will be fully integrated very soon."
    }
};

const MAX_FILES = 6;

const generateWorkOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const getStr = (len) => Array.from({length: len}).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `WI-${getStr(3)}-${getStr(4)}-${getStr(3)}`;
};

const getCsrfToken = () => {
    const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
};

const mockAiDatabase = {
    catPlumbing: [{ id: 1, name: "City Fix Plumbing", phone: "+1 555-0198", email: "contact@cityfix.com", dist: 1.2 }, { id: 2, name: "Rapid Pipe Brothers", phone: "+1 555-0234", email: "info@rapidpipe.com", dist: 3.5 }],
    catElectrical: [{ id: 4, name: "Sparky Electrical Co.", phone: "+1 555-0456", email: "hello@sparky.com", dist: 0.8 }, { id: 5, name: "Volt Masters", phone: "+1 555-0789", email: "support@voltmasters.com", dist: 4.1 }],
    catHVAC: [{ id: 7, name: "Cool Breeze HVAC", phone: "+1 555-1122", email: "service@coolbreeze.com", dist: 2.2 }],
    catGeneral: [{ id: 9, name: "All-Round Handyman", phone: "+1 555-9988", email: "fix@allround.com", dist: 1.5 }]
};

export default function App() {
    const [lang, setLang] = useState('en');
    const [isLangChecked, setIsLangChecked] = useState(false);
    const t = (key) => translations[lang][key] || translations['en'][key] || key;

    const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAuthSession') === 'true');
    const [communities, setCommunities] = useState([]);

    const [selectedCommunityId, setSelectedCommunityId] = useState(null);
    const [selectedApartmentId, setSelectedApartmentId] = useState(null);

    const [newCommunityName, setNewCommunityName] = useState('');
    const [newAptName, setNewAptName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // YENİ EKLENEN: Modal State'i (Flowu bozmadan ekran üstünde listeleme yapmak için)
    const [activeModal, setActiveModal] = useState(null);

    const [workOrderId, setWorkOrderId] = useState("");
    const [workOrderCategory, setWorkOrderCategory] = useState("catGeneral");
    const [workOrderTitle, setWorkOrderTitle] = useState("");
    const [workOrderStatus, setWorkOrderStatus] = useState("Todo");
    const [workOrderDate, setWorkOrderDate] = useState("");
    const [workOrderNotes, setWorkOrderNotes] = useState("");
    const [workOrderPriority, setWorkOrderPriority] = useState("prioNormal");
    const [workOrderVendor, setWorkOrderVendor] = useState("");
    const [workOrderEntryPermission, setWorkOrderEntryPermission] = useState(false);
    const [workOrderMaterialCost, setWorkOrderMaterialCost] = useState("");
    const [workOrderLaborCost, setWorkOrderLaborCost] = useState("");
    const [workOrderIsOutsourced, setWorkOrderIsOutsourced] = useState(false);

    const [aiVendors, setAiVendors] = useState([]);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [searchRadius, setSearchRadius] = useState(10);
    const [showAiPanel, setShowAiPanel] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);

    const loadDatabase = () => {
        if (!isAuthenticated) return;
        fetch('/api/communities')
            .then(res => res.json())
            .then(data => setCommunities(data))
            .catch(err => console.error("Database yükleme hatası:", err));
    };

   useEffect(() => {
           fetch('/api/auth/me', { method: 'GET', credentials: 'include' })
           .then(res => res.json())
           .then(data => {
               if (data.isAuthenticated) {
                   setIsAuthenticated(true);
                   sessionStorage.setItem('isAuthSession', 'true');
               }
           })
           .catch(err => console.error("Oturum kontrolü başarısız:", err));

           const savedLang = localStorage.getItem('appLanguage');
           if (savedLang) {
               setLang(savedLang);
               setIsLangChecked(true);
           } else {
               const detectedLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
               setLang(detectedLang);
               localStorage.setItem('appLanguage', detectedLang);
               setIsLangChecked(true);
           }
       }, []);

    useEffect(() => { loadDatabase(); }, [isAuthenticated]);
    useEffect(() => { setIsFormOpen(false); }, [selectedApartmentId]);
    useEffect(() => { if (!workOrderIsOutsourced) { setShowAiPanel(false); setAiVendors([]); } }, [workOrderIsOutsourced]);

    const handlePreview = (url) => {
        if (!url) return;
        if (url.startsWith('http')) { window.open(url, '_blank'); return; }
        let safeUrl = url.includes('?key=') ? url.split('?key=')[0] + '?key=' + encodeURIComponent(url.split('?key=')[1]) : url;
        if (safeUrl.startsWith('blob:')) { window.open(safeUrl, '_blank'); return; }
        const fullPath = safeUrl.startsWith('/') ? safeUrl : '/' + safeUrl;
        window.open(fullPath, '_blank');
    };

    const handleAddCommunity = async (e) => {
        e.preventDefault();
        const val = newCommunityName.trim();
        if (!val) return;
        if (communities.some(c => c.name.toLowerCase() === val.toLowerCase())) { alert(t('duplicateComm')); return; }

        try {
            await fetch('/api/communities', {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({ name: val })
            });
            setNewCommunityName(''); loadDatabase();
        } catch (error) { console.error(error); }
    };

    const handleAddApartment = async (e) => {
        e.preventDefault();
        const val = newAptName.trim();
        if (!val || !selectedCommunityId) return;
        const currentComm = communities.find(c => c.id === selectedCommunityId);
        if (currentComm?.apartments?.some(a => a.id.toLowerCase() === val.toLowerCase())) { alert(t('duplicateApt')); return; }

        try {
            await fetch(`/api/communities/${selectedCommunityId}/apartments`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({ id: val })
            });
            setNewAptName(''); loadDatabase();
        } catch (error) { console.error(error); }
    };

    const deleteCommunity = async (e, commId) => {
        e.stopPropagation();
        if (window.confirm(t('confirmDelComm'))) {
            await fetch(`/api/communities/${commId}`, { method: 'DELETE', headers: { 'X-XSRF-TOKEN': getCsrfToken() } });
            if (selectedCommunityId === commId) { setSelectedCommunityId(null); setSelectedApartmentId(null); }
            loadDatabase();
        }
    };

    const deleteApartment = async (e, commId, aptId) => {
        e.stopPropagation();
        if (window.confirm(t('confirmDelApt'))) {
            await fetch(`/api/apartments/${aptId}`, { method: 'DELETE', headers: { 'X-XSRF-TOKEN': getCsrfToken() } });
            if (selectedApartmentId === aptId) { setSelectedApartmentId(null); }
            loadDatabase();
        }
    };

    const deleteItem = async (e, communityId, aptId, itemId) => {
        e.stopPropagation();
        if (window.confirm(t('confirmDelItem'))) {
            await fetch(`/api/items/${itemId}`, { method: 'DELETE', headers: { 'X-XSRF-TOKEN': getCsrfToken() } });
            loadDatabase();
        }
    };

    const handleOpenNewForm = () => {
        setEditingItemId(null);
        setWorkOrderTitle(""); setWorkOrderNotes(""); setWorkOrderMaterialCost(""); setWorkOrderLaborCost("");
        setWorkOrderVendor(""); setWorkOrderEntryPermission(false); setWorkOrderIsOutsourced(false); setShowAiPanel(false); setUploadedFiles([]);
        setWorkOrderId(generateWorkOrderId());
        const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        setWorkOrderDate(now.toISOString().slice(0, 16));
        setIsFormOpen(true);
    };

    const startEdit = (item) => {
        setEditingItemId(item.id);
        setWorkOrderId(item.workOrderId || generateWorkOrderId());
        setWorkOrderCategory(item.category || "catGeneral");
        setWorkOrderTitle(item.title);
        setWorkOrderStatus(item.status || "Todo");
        setWorkOrderNotes(item.notes || "");
        setWorkOrderPriority(item.priority || "prioNormal");
        setWorkOrderVendor(item.vendor || "");
        setWorkOrderIsOutsourced(item.isOutsourced || false);
        setWorkOrderEntryPermission(item.entryPermission || false);
        setWorkOrderMaterialCost(item.materialCost || "");
        setWorkOrderLaborCost(item.laborCost || "");
        if (item.date) { const d = new Date(item.date); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); setWorkOrderDate(d.toISOString().slice(0, 16)); }

        if (item.attachments) {
            setUploadedFiles(item.attachments.map((url, idx) => ({ id: `existing_${idx}`, name: `${t('attachmentName')} ${idx+1}`, url: url, rawFile: null })));
        } else { setUploadedFiles([]); }

        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const saveItem = async () => {
        if (!workOrderTitle || !selectedApartmentId || isSaving) return;
        setIsSaving(true);

        const total = (Number(workOrderMaterialCost) || 0) + (Number(workOrderLaborCost) || 0);

        const formData = new FormData();
        formData.append("workOrderId", workOrderId);
        formData.append("title", workOrderTitle);
        formData.append("price", total);
        formData.append("category", workOrderCategory);
        formData.append("date", workOrderDate);
        formData.append("notes", workOrderNotes);
        formData.append("status", workOrderStatus);
        formData.append("priority", workOrderPriority);
        formData.append("vendor", workOrderVendor);
        formData.append("isOutsourced", workOrderIsOutsourced);
        formData.append("entryPermission", workOrderEntryPermission);
        formData.append("materialCost", workOrderMaterialCost);
        formData.append("laborCost", workOrderLaborCost);

        uploadedFiles.forEach(file => {
            if (file.rawFile) formData.append("attachments", file.rawFile);
            else if (file.url) formData.append("retainedAttachments", file.url);
        });

        const url = editingItemId ? `/api/items/${editingItemId}` : `/api/apartments/${selectedApartmentId}/items`;
        const method = editingItemId ? 'PUT' : 'POST';

        try {
            await fetch(url, { method: method, headers: { 'X-XSRF-TOKEN': getCsrfToken() }, body: formData });
            setEditingItemId(null); setIsFormOpen(false);
            loadDatabase();
        } catch (error) { console.error("Kayıt başarısız", error); }
        finally { setIsSaving(false); }
    };

    const updateItemStatus = async (communityId, aptId, itemId, newStatus) => {
        await fetch(`/api/items/${itemId}/status?status=${newStatus}`, { method: 'PUT', headers: { 'X-XSRF-TOKEN': getCsrfToken() } });
        loadDatabase();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles(prev => [...prev, ...files.map(file => ({ id: Math.random(), name: file.name, url: URL.createObjectURL(file), rawFile: file }))].slice(0, MAX_FILES));
    };
    const removeFile = (id) => setUploadedFiles(prev => prev.filter(f => f.id !== id));

    const fetchAiSuggestions = () => {
        setShowAiPanel(true); setIsAiLoading(true); setAiVendors([]);
        setTimeout(() => {
            const categoryVendors = mockAiDatabase[workOrderCategory] || mockAiDatabase['catGeneral'];
            setAiVendors(categoryVendors.filter(v => v.dist <= searchRadius));
            setIsAiLoading(false);
        }, 800);
    };

   const handleLogout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setCommunities([]);
        fetch("/logout", { method: "POST", credentials: "include", headers: { 'X-XSRF-TOKEN': getCsrfToken() } })
        .finally(() => { window.location.replace("/"); });
    };

    // YENİ EKLENEN: Hem Emergency hem High öncelikli işleri toplayan değişken
    const urgentItems = communities.flatMap(c =>
        c.apartments?.flatMap(a =>
            a.items?.filter(i => i.priority === 'prioEmergency' || i.priority === 'prioHigh')
             .map(i => ({...i, apt: a.id, comm: c.name}))
        ) || []
    );

    const selectedCommunity = communities.find(c => c.id === selectedCommunityId);
    const selectedApartment = selectedCommunity?.apartments?.find(a => a.id === selectedApartmentId);
    const filteredCommunities = communities.filter(c => (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()));

    // YENİ EKLENEN: Dinamik Modal İçeriği Oluşturucu
    const renderModalContent = () => {
        switch(activeModal) {
            case 'sites':
                return (
                    <div className="divide-y divide-slate-100">
                        {communities.length > 0 ? communities.map(c => (
                            <div key={c.id} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                <span className="font-bold text-slate-800">{c.name}</span>
                                <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{c.apartments?.length || 0} {t('units')}</span>
                            </div>
                        )) : <p className="p-6 text-center text-slate-500">{t('noCommunity')}</p>}
                    </div>
                );
            case 'units':
                return (
                    <div className="divide-y divide-slate-100">
                        {communities.flatMap(c => c.apartments?.map(a => ({...a, commName: c.name})) || []).length > 0 ?
                         communities.flatMap(c => c.apartments?.map(a => ({...a, commName: c.name})) || []).map((a, i) => (
                            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                <div>
                                    <span className="font-bold text-slate-800">{a.id}</span>
                                    <p className="text-xs text-slate-500">{a.commName}</p>
                                </div>
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">{a.items?.length || 0} {t('workOrders')}</span>
                            </div>
                        )) : <p className="p-6 text-center text-slate-500">Kayıtlı daire bulunmuyor.</p>}
                    </div>
                );
            case 'tasks':
                const pending = communities.flatMap(c => c.apartments?.flatMap(a => a.items?.filter(i => i.status !== 'Complete').map(i => ({...i, apt: a.id, comm: c.name}))) || []);
                return (
                    <div className="divide-y divide-slate-100">
                        {pending.length > 0 ? pending.map((task, i) => (
                            <div key={i} className="p-4 flex justify-between items-center hover:bg-slate-50">
                                <div>
                                    <span className="font-bold text-slate-800">{task.title}</span>
                                    <p className="text-xs text-slate-500">{task.comm} / {task.apt}</p>
                                </div>
                                <span className="text-xs font-bold text-amber-600 uppercase bg-amber-50 px-2 py-1 rounded border border-amber-200">{t(task.status.toLowerCase() === 'todo' ? 'todo' : 'inProgress')}</span>
                            </div>
                        )) : <p className="p-6 text-center text-slate-500">Bekleyen iş yok.</p>}
                    </div>
                );
            case 'vendor':
                return (
                    <div className="p-8 text-center space-y-4">
                        <div className="text-6xl mb-4">👷‍♂️</div>
                        <h3 className="text-xl font-bold text-slate-800">{t('newVendor')}</h3>
                        <p className="text-slate-500 font-medium">{t('comingSoon')}</p>
                    </div>
                );
            case 'notice':
                return (
                    <div className="p-8 text-center space-y-4">
                        <div className="text-6xl mb-4">📢</div>
                        <h3 className="text-xl font-bold text-slate-800">{t('sendNotice')}</h3>
                        <p className="text-slate-500 font-medium">{t('comingSoon')}</p>
                    </div>
                );
            default: return null;
        }
    };

    if (!isAuthenticated || !isLangChecked) return (
        <div className="min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative flex flex-col justify-center p-6">
            <div className="absolute inset-0 bg-slate-900/40 z-0"></div>
            <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-12 text-center mx-auto shadow-2xl border border-slate-200">
                <div className="w-20 h-20 bg-blue-800 text-white rounded-xl flex items-center justify-center mx-auto mb-8 shadow-md"><Icons.Layout size={36} /></div>
                <h2 className="text-3xl font-bold mb-2 text-slate-900 tracking-tight">{t('title')}</h2>
                <p className="text-slate-500 font-medium mb-10 text-base">Enterprise Management</p>

                <a href="/oauth2/authorization/google" className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg text-center flex items-center justify-center cursor-pointer block">
                    {t('googleLogin')}
                </a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans relative">
            <header className="bg-slate-900 text-white p-5 sticky top-0 z-40 shadow-md">
                <div className="max-w-[100rem] mx-auto w-full flex justify-between items-center px-4">
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setSelectedCommunityId(null); setSelectedApartmentId(null); }}>
                        <div className="bg-blue-600 p-3 rounded-lg shadow-sm"><Icons.Layout size={22} className="text-white" /></div>
                        <h1 className="text-2xl font-bold tracking-wide">{t('title')}</h1>
                    </div>
                    <div className="flex items-center gap-5">
                        <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-base font-semibold text-slate-200 outline-none cursor-pointer hover:bg-slate-700 transition-colors" value={lang} onChange={e => { setLang(e.target.value); localStorage.setItem('appLanguage', e.target.value); }}>
                            <option value="en">English</option><option value="tr">Türkçe</option>
                        </select>
                        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer" >
                            {t('logout')}
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-[100rem] mx-auto w-full p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-start">
                <aside className="lg:col-span-3 flex flex-col gap-6 self-stretch">
                    <button onClick={() => { setSelectedCommunityId(null); setSelectedApartmentId(null); }} className="w-full p-5 rounded-xl font-semibold text-lg flex items-center gap-4 bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all text-slate-700">
                        <div className="bg-blue-50 p-2 rounded-lg"><Icons.Home size={22} className="text-blue-700" /></div> {t('generalPortfolio')}
                    </button>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                        <div className="relative mb-6"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search size={18} /></span><input className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none text-base font-medium placeholder-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder={t('searchPlaceholder')} onChange={e => setSearchTerm(e.target.value)} /></div>

                        <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
                            {filteredCommunities.map(comm => (
                                <div key={comm.id} className="w-full rounded-xl border border-transparent hover:bg-slate-50 transition-all group flex items-center pr-2">
                                    <button onClick={() => { setSelectedCommunityId(comm.id); setSelectedApartmentId(null); }} className="flex-1 p-4 text-left font-semibold text-base text-slate-700 group-hover:text-blue-700">{comm.name}</button>
                                    <button onClick={(e) => deleteCommunity(e, comm.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition-all"><Icons.Trash size={18} /></button>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleAddCommunity} className="mt-6 flex gap-3"><input required className="flex-1 p-4 bg-white border border-slate-200 rounded-xl text-base font-semibold outline-none focus:border-blue-600 transition-all shadow-sm" placeholder={t('siteNamePlaceholder')} value={newCommunityName} onChange={e => setNewCommunityName(e.target.value)} /><button className="bg-slate-800 hover:bg-blue-700 text-white px-5 rounded-xl transition-colors shadow-sm"><Icons.Plus size={24}/></button></form>
                    </div>

                    <div className="mt-auto pt-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('statsTitle')}</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                                        <span>{t('occupancyRate')}</span><span>85%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                                        <span>{t('completionRate')}</span><span>92%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 shadow-sm relative overflow-hidden group">
                            <div className="absolute -right-2 -top-2 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-500">💡</div>
                            <h4 className="text-sm font-bold text-indigo-900 mb-3 relative z-10">{t('helpSupport')}</h4>
                            <ul className="space-y-3 text-xs font-bold text-indigo-700 relative z-10">
                                <li><a href="#" className="hover:text-indigo-900 flex items-center gap-2 transition-colors"><span>👉</span> {t('howToUse')}</a></li>
                                <li><a href="#" className="hover:text-indigo-900 flex items-center gap-2 transition-colors"><span>🎧</span> {t('contactSupport')}</a></li>
                            </ul>
                        </div>
                    </div>
                </aside>

                <main className="lg:col-span-9">
                    {selectedCommunityId === null && (
                        <div className="space-y-8 animate-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { id: 'sites', label: t('totalSites'), val: communities.length, icon: Icons.Layout, color: "text-blue-600" },
                                    { id: 'units', label: t('totalApts'), val: communities.reduce((acc, c) => acc + (c.apartments?.length || 0), 0), icon: Icons.Home, color: "text-emerald-600" },
                                    { id: 'tasks', label: t('pendingTasks'), val: communities.reduce((acc, c) => acc + c.apartments?.reduce((a, apt) => a + (apt.items?.filter(i => i.status !== 'Complete').length || 0), 0), 0), icon: Icons.Edit, color: "text-amber-600" },
                                    { id: 'expense', label: t('totalExpense'), val: `$${communities.reduce((acc, c) => acc + c.apartments?.reduce((a, apt) => a + (apt.items?.reduce((sum, i) => sum + (Number(i.price) || 0), 0) || 0), 0), 0)}`, icon: Icons.Plus, color: "text-rose-600" }
                                ].map((kpi, i) => (
                                    // YENİ EKLENEN: onClick olayı ve cursor-pointer ile tıklanabilirlik
                                    <div key={i} onClick={() => kpi.id !== 'expense' ? setActiveModal(kpi.id) : null} className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 transition-all ${kpi.id !== 'expense' ? 'cursor-pointer hover:border-blue-400 hover:shadow-md' : ''}`}>
                                        <div className="bg-slate-50 p-4 rounded-xl"><kpi.icon size={28} className={kpi.color} /></div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
                                            <p className="text-3xl font-black text-slate-800 mt-1">{kpi.val}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                <h3 className="text-base font-bold text-slate-800 mb-5">{t('quickActions')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button onClick={() => setActiveModal('vendor')} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all group text-left shadow-sm">
                                        <div className="text-2xl group-hover:scale-110 transition-transform">➕</div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">{t('newVendor')}</span>
                                    </button>
                                    <button onClick={() => window.print()} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all group text-left shadow-sm">
                                        <div className="text-2xl group-hover:scale-110 transition-transform">📊</div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-emerald-700">{t('genReport')}</span>
                                    </button>
                                    <button onClick={() => setActiveModal('notice')} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all group text-left shadow-sm">
                                        <div className="text-2xl group-hover:scale-110 transition-transform">✉️</div>
                                        <span className="font-semibold text-sm text-slate-700 group-hover:text-amber-700">{t('sendNotice')}</span>
                                    </button>
                                </div>
                            </div>

                            {communities.length === 0 && (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-12 text-center shadow-sm">
                                    <div className="text-6xl mb-5 opacity-80">🏢</div>
                                    <h3 className="text-2xl font-black text-indigo-900 mb-2">{t('emptyPortfolioTitle')}</h3>
                                    <p className="text-indigo-700 font-medium">{t('emptyPortfolioSub')}</p>
                                </div>
                            )}

                            {/* YENİ EKLENEN: Hem Emergency Hem High filtrelenmesi */}
                            {communities.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-slate-100 font-bold text-xl text-slate-800">{t('urgentTasksTitle')}</div>
                                    <div className="divide-y divide-slate-100">
                                        {urgentItems.length > 0 ?
                                            urgentItems.map((item, idx) => (
                                                <div key={idx} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedCommunityId(communities.find(c => c.name === item.comm).id); setSelectedApartmentId(item.apt); }}>
                                                    <div className="flex gap-5 items-center">
                                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-md ${item.priority === 'prioEmergency' ? 'bg-rose-100 text-rose-700' : 'bg-orange-100 text-orange-700'}`}>
                                                            {item.priority === 'prioEmergency' ? t('urgentBadge') : t('highBadge')}
                                                        </span>
                                                        <div>
                                                            <p className="text-base font-bold text-slate-800">{item.title}</p>
                                                            <p className="text-sm text-slate-500 mt-1">{item.comm} / <span className="font-semibold text-indigo-600">{item.apt}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="font-black text-emerald-700 text-xl">${item.price}</div>
                                                </div>
                                            )) : <p className="p-10 text-center text-slate-400 font-medium text-lg">{t('noUrgentTasks')}</p>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Daire ve Site detay ekranları (Buralar değişmedi) */}
                    {selectedCommunityId !== null && selectedApartmentId === null && selectedCommunity && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 border-b border-slate-100 pb-6">
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{selectedCommunity.name}</h2>
                                <form onSubmit={handleAddApartment} className="flex gap-3"><input required className="p-4 bg-white rounded-xl outline-none font-medium text-base border border-slate-200 focus:border-blue-600 w-64 shadow-sm" placeholder={t('aptNoPlaceholder')} value={newAptName} onChange={e => setNewAptName(e.target.value)} /><button className="bg-blue-700 hover:bg-blue-800 text-white px-8 rounded-xl font-semibold text-base shadow-sm transition-colors">{t('addBtn')}</button></form>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                                {(selectedCommunity.apartments || []).map(apt => (
                                    <div key={apt.id} className="relative border border-slate-200 p-8 rounded-2xl cursor-pointer hover:border-blue-400 hover:shadow-md transition-all bg-slate-50/50 text-center group" onClick={() => setSelectedApartmentId(apt.id)}>
                                        <button onClick={(e) => deleteApartment(e, selectedCommunity.id, apt.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition-all"><Icons.Trash size={18} /></button>
                                        <h4 className="text-3xl font-bold text-slate-800 mb-3">{apt.id}</h4>
                                        <div className="text-lg font-bold text-emerald-700 bg-emerald-100/50 py-1.5 px-4 rounded-xl inline-block border border-emerald-200/50">${(apt.items || []).reduce((sum, i) => sum + (Number(i.price) || 0), 0)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedCommunityId !== null && selectedApartmentId !== null && selectedApartment && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-white p-5 px-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-5">
                                    <button onClick={() => setSelectedApartmentId(null)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"><Icons.ArrowLeft size={20} /></button>
                                    <h2 className="text-xl font-bold text-slate-500">{selectedCommunity.name} <span className="mx-2 text-slate-300">/</span> <span className="text-blue-700">{selectedApartment.id}</span></h2>
                                </div>
                                {!isFormOpen && (
                                    <button onClick={handleOpenNewForm} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2">
                                        <Icons.Plus size={18} /> {t('createWorkItem')}
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                                <div className={`space-y-6 transition-all duration-300 ${isFormOpen ? 'xl:col-span-6' : 'xl:col-span-12'}`}>
                                    {(selectedApartment.items || []).length === 0 && !isFormOpen && (
                                        <div className="text-center p-12 bg-white rounded-3xl border border-slate-200 border-dashed text-slate-400">
                                            {t('noItems')}
                                        </div>
                                    )}

                                    {(selectedApartment.items || []).map(item => (
                                        <div key={item.id} className={`bg-white border-l-8 rounded-3xl p-6 shadow-sm border-y border-r border-slate-200 transition-all hover:shadow-md ${item.priority === 'prioEmergency' ? 'border-l-rose-600' : item.priority === 'prioHigh' ? 'border-l-orange-500' : 'border-l-blue-600'}`}>
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="flex flex-wrap gap-3 items-center">
                                                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-200">{t(item.category || 'catGeneral')}</span>
                                                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${item.priority === 'prioEmergency' ? 'bg-rose-50 text-rose-700 border-rose-200' : item.priority === 'prioHigh' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{t(item.priority || 'prioNormal')}</span>

                                                    <select
                                                        value={item.status || "Todo"}
                                                        onChange={(e) => updateItemStatus(selectedCommunity.id, selectedApartment.id, item.id, e.target.value)}
                                                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none cursor-pointer ml-1 ${
                                                            item.status === 'Complete' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                            item.status === 'InProgress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                            'bg-slate-50 text-slate-600 border-slate-200'
                                                        }`}
                                                    >
                                                        <option value="Todo">{t('todo')}</option>
                                                        <option value="InProgress">{t('inProgress')}</option>
                                                        <option value="Complete">{t('complete')}</option>
                                                    </select>

                                                    <span className="ml-2 font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{item.workOrderId}</span>
                                                </div>
                                                <div className="text-3xl font-bold text-emerald-700">${item.price}</div>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-900 mb-5">{item.title}</h3>

                                            <div className="grid grid-cols-2 gap-5 p-5 bg-slate-50/80 rounded-2xl text-sm font-medium text-slate-600 border border-slate-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100"><Icons.Lock size={16} className="text-slate-400"/></div>
                                                    <div>
                                                        <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">{t('vendorLabel')}</span>
                                                        <span className="text-slate-800 font-semibold flex items-center gap-2">
                                                            {item.vendor || '—'}
                                                            {item.isOutsourced && <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-md">OUTSOURCED</span>}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4"><div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100"><Icons.Home size={16} className="text-slate-400"/></div> <div><span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">{t('permissionLabel')}</span><span className={`font-semibold ${item.entryPermission ? "text-emerald-700" : "text-rose-600"}`}>{item.entryPermission ? t('granted') : t('required')}</span></div></div>
                                            </div>

                                            {item.attachments && item.attachments.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-5">
                                                    {item.attachments.map((fileUrl, idx) => (
                                                        <button key={idx} onClick={() => handlePreview(fileUrl)} className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                                                            <Icons.File size={14} />
                                                            <span className="truncate max-w-[120px]">{t('attachmentName')} {idx+1}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center mt-5 pt-5 border-t border-slate-100">
                                                <span className="text-xs font-semibold text-slate-400">
                                                    {item.date ? new Date(item.date).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => startEdit(item)} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"><Icons.Edit size={18} /></button>
                                                    <button onClick={(e) => deleteItem(e, selectedCommunity.id, selectedApartment.id, item.id)} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"><Icons.Trash size={18} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {isFormOpen && (
                                    <div className="xl:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl h-fit sticky top-28 animate-in">
                                        <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-5">
                                            <div>
                                                <div className="text-xs font-mono font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block mb-3 border border-indigo-100 shadow-sm">{workOrderId}</div>
                                                <h3 className={`text-2xl font-bold transition-colors ${editingItemId ? 'text-emerald-700' : 'text-slate-900'}`}>
                                                    {editingItemId ? t('updateOrder') : t('saveOrder')}
                                                </h3>
                                            </div>
                                            <button onClick={() => setIsFormOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg">✕</button>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('jobTitle')}</label>
                                                <input className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-lg outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderTitle} onChange={e => setWorkOrderTitle(e.target.value)} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-5">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('category')}</label>
                                                    <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderCategory} onChange={e => setWorkOrderCategory(e.target.value)}>
                                                        <option value="catGeneral">{t('catGeneral')}</option><option value="catPlumbing">{t('catPlumbing')}</option><option value="catElectrical">{t('catElectrical')}</option><option value="catAppliance">{t('catAppliance')}</option><option value="catFlooring">{t('catFlooring')}</option><option value="catHVAC">{t('catHVAC')}</option><option value="catOther">{t('catOther')}</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('priority')}</label>
                                                    <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderPriority} onChange={e => setWorkOrderPriority(e.target.value)}>
                                                        <option value="prioLow">{t('prioLow')}</option><option value="prioNormal">{t('prioNormal')}</option><option value="prioHigh">{t('prioHigh')}</option><option value="prioEmergency">{t('prioEmergency')}</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('status')}</label>
                                                <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderStatus} onChange={e => setWorkOrderStatus(e.target.value)}>
                                                    <option value="Todo">{t('todo')}</option><option value="InProgress">{t('inProgress')}</option><option value="Complete">{t('complete')}</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('vendorLabel')}</label>
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                                    <input className="flex-1 w-full p-4 bg-white border border-slate-300 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" placeholder={t('vendorPlaceholder')} value={workOrderVendor} onChange={e => setWorkOrderVendor(e.target.value)} />

                                                    <label className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors w-full sm:w-auto shrink-0 shadow-sm">
                                                        <input type="checkbox" className="w-4 h-4 accent-blue-700 cursor-pointer rounded" checked={workOrderIsOutsourced} onChange={e => setWorkOrderIsOutsourced(e.target.checked)} />
                                                        <span className="text-sm font-semibold text-slate-700">{t('outsourced')}</span>
                                                    </label>
                                                </div>

                                                {workOrderIsOutsourced && (
                                                    <div className="mt-4 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                                                        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs font-bold text-indigo-900">{t('radius')}</span>
                                                                <select className="bg-white border border-indigo-200 text-indigo-800 text-xs font-semibold rounded-lg px-3 py-2 outline-none" value={searchRadius} onChange={e => setSearchRadius(Number(e.target.value))}>
                                                                    <option value={5}>5 {t('miles')}</option>
                                                                    <option value={10}>10 {t('miles')}</option>
                                                                    <option value={25}>25 {t('miles')}</option>
                                                                </select>
                                                            </div>
                                                            <button type="button" onClick={fetchAiSuggestions} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all">
                                                                {t('aiSuggestBtn')}
                                                            </button>
                                                        </div>

                                                        {showAiPanel && (
                                                            <div className="bg-white rounded-xl border border-indigo-100 overflow-hidden shadow-inner">
                                                                {isAiLoading ? (
                                                                    <div className="p-8 text-center text-indigo-500 text-sm font-semibold animate-pulse">{t('aiSearching')}</div>
                                                                ) : aiVendors.length > 0 ? (
                                                                    <div className="divide-y divide-slate-100">
                                                                        {aiVendors.map(v => (
                                                                            <div key={v.id} className="p-4 hover:bg-slate-50 flex justify-between items-center transition-colors">
                                                                                <div>
                                                                                    <p className="font-bold text-sm text-slate-800">{v.name} <span className="text-[9px] ml-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{v.dist} {t('miles')}</span></p>
                                                                                    <p className="text-[11px] text-slate-500 mt-1">{v.phone} • {v.email}</p>
                                                                                </div>
                                                                                <button type="button" onClick={() => { setWorkOrderVendor(v.name); setShowAiPanel(false); }} className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors">
                                                                                    {t('selectBtn')}
                                                                                </button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <div className="p-6 text-center text-slate-500 text-xs font-medium">{t('noVendorsFound')}</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('materialCost')}</label>
                                                    <input type="number" className="w-full p-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none text-sm shadow-sm focus:border-blue-600" placeholder="0.00" value={workOrderMaterialCost} onChange={e => setWorkOrderMaterialCost(e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('laborCost')}</label>
                                                    <input type="number" className="w-full p-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none text-sm shadow-sm focus:border-blue-600" placeholder="0.00" value={workOrderLaborCost} onChange={e => setWorkOrderLaborCost(e.target.value)} />
                                                </div>
                                                <div className="col-span-2 pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
                                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('totalCost')}</span>
                                                    <span className="text-xl font-bold text-emerald-700">${(Number(workOrderMaterialCost) || 0) + (Number(workOrderLaborCost) || 0)}</span>
                                                </div>
                                            </div>

                                            <label className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                                                <input type="checkbox" className="w-4 h-4 accent-blue-700 cursor-pointer rounded" checked={workOrderEntryPermission} onChange={e => setWorkOrderEntryPermission(e.target.checked)} />
                                                <span className="text-sm font-semibold text-slate-700">{t('entryPermission')}</span>
                                            </label>

                                            <textarea className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24 outline-none resize-none text-sm font-medium focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" placeholder={t('notes')} value={workOrderNotes} onChange={e => setWorkOrderNotes(e.target.value)} />

                                            <div className="pt-2">
                                                <button type="button" onClick={() => document.getElementById('workorder-smart-upload').click()} className="w-full flex justify-center items-center gap-2 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all py-5 rounded-xl font-bold text-sm text-slate-600 cursor-pointer">
                                                    <Icons.Camera size={18} className="text-slate-400"/> {t('uploadFile')}
                                                </button>
                                                <input id="workorder-smart-upload" type="file" multiple accept="image/*,application/pdf,video/*" capture="environment" className="hidden" onChange={handleFileChange} />
                                            </div>

                                            {uploadedFiles.length > 0 && (
                                                <div className="grid grid-cols-1 gap-2 pt-1">
                                                    {uploadedFiles.map(file => (
                                                        <div key={file.id || Math.random()} className="flex justify-between items-center bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm cursor-pointer hover:border-blue-400 transition-colors" onClick={() => handlePreview(file.url)}>
                                                            <div className="flex items-center gap-2 truncate">
                                                                <Icons.File size={16} className="text-blue-600 shrink-0" />
                                                                <span className="text-xs font-semibold text-slate-700 truncate">{file.name || t('attachmentName')}</span>
                                                            </div>
                                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(file.id); }} className="text-rose-600 font-bold p-1 hover:bg-rose-50 rounded text-xs">✕</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="pt-4">
                                                <button disabled={isSaving} onClick={saveItem} className={`w-full py-5 transition-all text-white font-bold rounded-2xl uppercase tracking-widest text-sm shadow-md ${isSaving ? 'bg-slate-400 cursor-not-allowed' : editingItemId ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-700 hover:bg-blue-800'}`}>
                                                    {isSaving ? t('saving') : editingItemId ? t('updateOrder') : t('saveOrder')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* YENİ EKLENEN: GLOBAL MODAL OVERLAY (Tüm ekstra detayları burada gösterir) */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Arkaplanı karartan kısım */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>

                    {/* Modalın kendisi */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-in">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                            <h3 className="text-lg font-bold text-slate-800">
                                {activeModal === 'sites' ? t('totalSites') :
                                 activeModal === 'units' ? t('totalApts') :
                                 activeModal === 'tasks' ? t('pendingTasks') : ''}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="p-2 text-slate-400 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-bold text-xs">
                                {t('close')}
                            </button>
                        </div>
                        <div className="p-2 overflow-y-auto custom-scrollbar">
                            {renderModalContent()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}




















// import { useState, useEffect } from 'react';
// import { Icons } from './components/Icons.jsx';
//
// const translations = {
//     tr: {
//         title: "Property Manager", searchPlaceholder: "Site Ara...", generalPortfolio: "Genel Portföy",
//         sitesProperties: "SİTELER VE MÜLKLER", portfolioStatus: "Genel Portföy Durumu", portfolioSub: "Yönetmek istediğiniz siteyi sol menüden seçin.",
//         noCommunity: "Kayıtlı Site Bulunmuyor", noCommunitySub: "Başlamak için sol taraftan ilk sitenizi ekleyin.",
//         units: "Daire / Ünite", totalExpense: "Toplam Harcama", aptsAndOrders: "Daireler ve Mevcut İş Emirleri",
//         addAptTitle: "Yeni Daire Ekle", aptNoPlaceholder: "Daire Adı/No (Örn: A2)", addBtn: "Ekle",
//         noItems: "Kayıtlı iş emri veya fatura yok", detailsAndOrder: "Detaylar ve Kayıt Ekle →",
//         workOrders: "İş Emri", total: "Toplam Maliyet", todo: "Yapılacak", inProgress: "Devam Ediyor", complete: "Tamamlandı",
//         saveOrder: "İş Emrini Kaydet", updateOrder: "İş Emrini Güncelle", cancelEdit: "İptal",
//         cancel: "İptal Et", googleLogin: "Google ile Giriş Yap", siteNamePlaceholder: "Yeni Site Adı Yazın...",
//         confirmDelComm: "Bu siteyi ve içindeki TÜM daireleri silmek istediğinize emin misiniz?",
//         confirmDelApt: "Bu daireyi ve TÜM kayıtları silmek istediğinize emin misiniz?",
//         confirmDelItem: "Bu iş emrini silmek istediğinize emin misiniz?",
//         category: "Kategori", jobTitle: "İşlem Başlığı / Alınan Eşya", price: "Tutar ($)", dateTime: "Tarih ve Saat",
//         catGeneral: "Genel Bakım", catAppliance: "Beyaz Eşya", catPlumbing: "Tesisat", catElectrical: "Elektrik", catFlooring: "Zemin Tamiri", catHVAC: "Klima", catOther: "Diğer",
//         descPlaceholder: "Sorunu, yapılan işlemi detaylıca yazın...", attachments: "Ekli Belgeler",
//         uploadFile: "Medya / Dosya Yükle", notes: "Notlar ve Detaylı Açıklama",
//         fileLimitsInfo: "Maksimum 6 Dosya • Max 15MB", activeUnitsTitle: "Aktif Daire Özeti", searchActiveUnits: "Daire ara...",
//         priority: "Öncelik", prioLow: "Düşük", prioNormal: "Normal", prioHigh: "Yüksek", prioEmergency: "Acil",
//         vendor: "Atanan Görevli / Firma", vendorPlaceholder: "Örn: Ahmet Usta",
//         materialCost: "Malzeme Maliyeti ($)", laborCost: "İşçilik Ücreti ($)", totalCost: "Genel Toplam:",
//         entryPermission: "Kiracı yokken daireye girilebilir", status: "Durum",
//         totalSites: "Toplam Siteler", totalApts: "Toplam Daire", pendingTasks: "Bekleyen İşler",
//         urgentTasksTitle: "Dikkat Gerektiren İşler (Acil)", urgentBadge: "ACİL", noUrgentTasks: "Şu an acil bir iş emri bulunmuyor.",
//         vendorLabel: "Görevli", permissionLabel: "İzin Durumu", granted: "İzin Var", required: "Gerekli",
//         outsourced: "Dışarıdan (Outsource)", aiSuggestBtn: "✨ AI ile Bölgedeki Firmaları Bul", aiSearching: "Yapay zeka bölgeyi tarıyor...",
//         radius: "Mesafe (Mil):", selectBtn: "Seç", noVendorsFound: "Bu mesafede ve kategoride firma bulunamadı.", miles: "mil",
//         duplicateComm: "Bu isimde bir site zaten kayıtlı!", duplicateApt: "Bu isimde bir daire zaten kayıtlı!",
//         createWorkItem: "Yeni İş Emri Oluştur", saving: "Kaydediliyor...",
//         attachmentName: "Ek Dosya", logout: "Çıkış Yap",
//         // YENİ EKLENEN ÇEVİRİLER
//         statsTitle: "Mini İstatistik", occupancyRate: "Toplam Doluluk Oranı", completionRate: "Tamamlanan İşlem Oranı",
//         helpSupport: "Yardım ve Destek", howToUse: "Sistemi nasıl kullanırım?", contactSupport: "Destek ile İletişime Geç",
//         quickActions: "Hızlı İşlemler", newVendor: "Yeni Görevli / Tedarikçi Ekle", genReport: "Genel Rapor Oluştur", sendNotice: "Kiracılara Duyuru Gönder",
//         emptyPortfolioTitle: "Portföyünüz şu an boş.", emptyPortfolioSub: "Sol taraftaki menüden ilk sitenizi ekleyerek yönetmeye başlayın!"
//     },
//     en: {
//         title: "Property Manager", searchPlaceholder: "Search Site...", generalPortfolio: "General Portfolio",
//         sitesProperties: "SITES AND PROPERTIES", portfolioStatus: "Global Portfolio Overview", portfolioSub: "Select a community from the left menu.",
//         noCommunity: "No Registered Communities", noCommunitySub: "Add your first community from the left menu to begin.",
//         units: "Units", totalExpense: "Total Expense", aptsAndOrders: "Units & Work Orders",
//         addAptTitle: "Add New Unit", aptNoPlaceholder: "Unit Name/No (e.g., A2)", addBtn: "Add",
//         noItems: "No registered work orders or invoices", detailsAndOrder: "Details & Add Record →",
//         workOrders: "Work Orders", total: "Total Cost", todo: "To Do", inProgress: "In Progress", complete: "Complete",
//         saveOrder: "Save Work Order", updateOrder: "Update Work Order", cancelEdit: "Cancel",
//         cancel: "Cancel", googleLogin: "Sign in with Google", siteNamePlaceholder: "Type New Site Name...",
//         confirmDelComm: "Are you sure you want to delete this community and ALL its units?",
//         confirmDelApt: "Are you sure you want to delete this unit and ALL its records?",
//         confirmDelItem: "Are you sure you want to delete this work order?",
//         category: "Category", jobTitle: "Job Title / Item Bought", price: "Amount ($)", dateTime: "Date and Time",
//         catGeneral: "General Maintenance", catAppliance: "Appliance", catPlumbing: "Plumbing", catElectrical: "Electrical", catFlooring: "Flooring", catHVAC: "HVAC", catOther: "Other",
//         descPlaceholder: "Describe the issue or action taken in detail...", attachments: "Attached Files",
//         uploadFile: "Upload Media / File", notes: "Notes & Detailed Description",
//         fileLimitsInfo: "Max 6 Files • Max 15MB", activeUnitsTitle: "Active Units Summary", searchActiveUnits: "Search units...",
//         priority: "Priority", prioLow: "Low", prioNormal: "Normal", prioHigh: "High", prioEmergency: "Emergency",
//         vendor: "Assigned Vendor", vendorPlaceholder: "e.g., John Doe",
//         materialCost: "Material ($)", laborCost: "Labor ($)", totalCost: "Grand Total:",
//         entryPermission: "Entry Permission Granted", status: "Status",
//         totalSites: "Total Sites", totalApts: "Total Units", pendingTasks: "Pending Tasks",
//         urgentTasksTitle: "Attention Required (Urgent)", urgentBadge: "URGENT", noUrgentTasks: "No urgent work orders at this time.",
//         vendorLabel: "Vendor", permissionLabel: "Permission", granted: "Granted", required: "Required",
//         outsourced: "Outsourced", aiSuggestBtn: "✨ Find Local Vendors with AI", aiSearching: "AI is scanning the area...",
//         radius: "Radius (Miles):", selectBtn: "Select", noVendorsFound: "No vendors found for this category and radius.", miles: "mi",
//         duplicateComm: "A community with this name already exists!", duplicateApt: "An apartment with this name already exists!",
//         createWorkItem: "Create Work Item", saving: "Saving...",
//         attachmentName: "Attachment", logout: "Logout",
//         // NEW TRANSLATIONS
//         statsTitle: "Mini Statistics", occupancyRate: "Total Occupancy Rate", completionRate: "Completion Rate",
//         helpSupport: "Help & Support", howToUse: "How do I use the system?", contactSupport: "Contact Support",
//         quickActions: "Quick Actions", newVendor: "Add New Vendor / Supplier", genReport: "Generate Report", sendNotice: "Send Notice to Tenants",
//         emptyPortfolioTitle: "Your portfolio is currently empty.", emptyPortfolioSub: "Add your first community from the left menu to start managing!"
//     }
// };
//
// const MAX_FILES = 6;
//
// const generateWorkOrderId = () => {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     const getStr = (len) => Array.from({length: len}).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
//     return `WI-${getStr(3)}-${getStr(4)}-${getStr(3)}`;
// };
//
// // CRITICAL SECURITY UPDATE: Helper to extract CSRF token from Spring's cookie
// const getCsrfToken = () => {
//     const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
//     return match ? decodeURIComponent(match[2]) : '';
// };
//
// const mockAiDatabase = {
//     catPlumbing: [{ id: 1, name: "City Fix Plumbing", phone: "+1 555-0198", email: "contact@cityfix.com", dist: 1.2 }, { id: 2, name: "Rapid Pipe Brothers", phone: "+1 555-0234", email: "info@rapidpipe.com", dist: 3.5 }],
//     catElectrical: [{ id: 4, name: "Sparky Electrical Co.", phone: "+1 555-0456", email: "hello@sparky.com", dist: 0.8 }, { id: 5, name: "Volt Masters", phone: "+1 555-0789", email: "support@voltmasters.com", dist: 4.1 }],
//     catHVAC: [{ id: 7, name: "Cool Breeze HVAC", phone: "+1 555-1122", email: "service@coolbreeze.com", dist: 2.2 }],
//     catGeneral: [{ id: 9, name: "All-Round Handyman", phone: "+1 555-9988", email: "fix@allround.com", dist: 1.5 }]
// };
//
// export default function App() {
//     const [lang, setLang] = useState('en');
//     const [isLangChecked, setIsLangChecked] = useState(false);
//     const t = (key) => translations[lang][key] || translations['en'][key] || key;
//
//     const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('isAuthSession') === 'true');
//     const [communities, setCommunities] = useState([]);
//
//     const [selectedCommunityId, setSelectedCommunityId] = useState(null);
//     const [selectedApartmentId, setSelectedApartmentId] = useState(null);
//
//     const [newCommunityName, setNewCommunityName] = useState('');
//     const [newAptName, setNewAptName] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//
//     const [workOrderId, setWorkOrderId] = useState("");
//     const [workOrderCategory, setWorkOrderCategory] = useState("catGeneral");
//     const [workOrderTitle, setWorkOrderTitle] = useState("");
//     const [workOrderStatus, setWorkOrderStatus] = useState("Todo");
//     const [workOrderDate, setWorkOrderDate] = useState("");
//     const [workOrderNotes, setWorkOrderNotes] = useState("");
//     const [workOrderPriority, setWorkOrderPriority] = useState("prioNormal");
//     const [workOrderVendor, setWorkOrderVendor] = useState("");
//     const [workOrderEntryPermission, setWorkOrderEntryPermission] = useState(false);
//     const [workOrderMaterialCost, setWorkOrderMaterialCost] = useState("");
//     const [workOrderLaborCost, setWorkOrderLaborCost] = useState("");
//     const [workOrderIsOutsourced, setWorkOrderIsOutsourced] = useState(false);
//
//     const [aiVendors, setAiVendors] = useState([]);
//     const [isAiLoading, setIsAiLoading] = useState(false);
//     const [searchRadius, setSearchRadius] = useState(10);
//     const [showAiPanel, setShowAiPanel] = useState(false);
//
//     const [uploadedFiles, setUploadedFiles] = useState([]);
//     const [editingItemId, setEditingItemId] = useState(null);
//
//     const loadDatabase = () => {
//         if (!isAuthenticated) return;
//         fetch('/api/communities')
//             .then(res => res.json())
//             .then(data => setCommunities(data))
//             .catch(err => console.error("Database yükleme hatası:", err));
//     };
//
//    useEffect(() => {
//            // 1. OTURUM KONTROLÜ
//            fetch('/api/auth/me', {
//                method: 'GET',
//                credentials: 'include'
//            })
//            .then(res => res.json())
//            .then(data => {
//                if (data.isAuthenticated) {
//                    setIsAuthenticated(true);
//                    sessionStorage.setItem('isAuthSession', 'true');
//                }
//            })
//            .catch(err => console.error("Oturum kontrolü başarısız:", err));
//
//            // 2. DİL AYARLARI KONTROLÜ
//            const savedLang = localStorage.getItem('appLanguage');
//            if (savedLang) {
//                setLang(savedLang);
//                setIsLangChecked(true);
//            } else {
//                const detectedLang = navigator.language.startsWith('tr') ? 'tr' : 'en';
//                setLang(detectedLang);
//                localStorage.setItem('appLanguage', detectedLang);
//                setIsLangChecked(true);
//            }
//        }, []);
//
//     useEffect(() => { loadDatabase(); }, [isAuthenticated]);
//     useEffect(() => { setIsFormOpen(false); }, [selectedApartmentId]);
//     useEffect(() => { if (!workOrderIsOutsourced) { setShowAiPanel(false); setAiVendors([]); } }, [workOrderIsOutsourced]);
//
//     const handlePreview = (url) => {
//         if (!url) return;
//
//         // Eğer zaten tam bir URL ise (http ile başlıyorsa) olduğu gibi aç
//         if (url.startsWith('http')) {
//             window.open(url, '_blank');
//             return;
//         }
//
//         // URL'deki özel karakterleri güvenli hale getir
//         let safeUrl = url.includes('?key=')
//             ? url.split('?key=')[0] + '?key=' + encodeURIComponent(url.split('?key=')[1])
//             : url;
//
//         // blob: tipindeki yerel dosyaları doğrudan aç
//         if (safeUrl.startsWith('blob:')) {
//             window.open(safeUrl, '_blank');
//             return;
//         }
//
//         // Backend'in düzgün çalışması için başında '/' olduğundan emin ol ve
//         // mevcut domain'i (localhost:5173 veya abc.xyz) kullanarak aç
//         const fullPath = safeUrl.startsWith('/') ? safeUrl : '/' + safeUrl;
//         window.open(fullPath, '_blank');
//     };
//
//     const handleAddCommunity = async (e) => {
//         e.preventDefault();
//         const val = newCommunityName.trim();
//         if (!val) return;
//         if (communities.some(c => c.name.toLowerCase() === val.toLowerCase())) { alert(t('duplicateComm')); return; }
//
//         try {
//             await fetch('/api/communities', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-XSRF-TOKEN': getCsrfToken()
//                 },
//                 body: JSON.stringify({ name: val })
//             });
//             setNewCommunityName(''); loadDatabase();
//         } catch (error) { console.error(error); }
//     };
//
//     const handleAddApartment = async (e) => {
//         e.preventDefault();
//         const val = newAptName.trim();
//         if (!val || !selectedCommunityId) return;
//         const currentComm = communities.find(c => c.id === selectedCommunityId);
//         if (currentComm?.apartments?.some(a => a.id.toLowerCase() === val.toLowerCase())) { alert(t('duplicateApt')); return; }
//
//         try {
//             await fetch(`/api/communities/${selectedCommunityId}/apartments`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-XSRF-TOKEN': getCsrfToken()
//                 },
//                 body: JSON.stringify({ id: val })
//             });
//             setNewAptName(''); loadDatabase();
//         } catch (error) { console.error(error); }
//     };
//
//     const deleteCommunity = async (e, commId) => {
//         e.stopPropagation();
//         if (window.confirm(t('confirmDelComm'))) {
//             await fetch(`/api/communities/${commId}`, {
//                 method: 'DELETE',
//                 headers: { 'X-XSRF-TOKEN': getCsrfToken() }
//             });
//             if (selectedCommunityId === commId) { setSelectedCommunityId(null); setSelectedApartmentId(null); }
//             loadDatabase();
//         }
//     };
//
//     const deleteApartment = async (e, commId, aptId) => {
//         e.stopPropagation();
//         if (window.confirm(t('confirmDelApt'))) {
//             await fetch(`/api/apartments/${aptId}`, {
//                 method: 'DELETE',
//                 headers: { 'X-XSRF-TOKEN': getCsrfToken() }
//             });
//             if (selectedApartmentId === aptId) { setSelectedApartmentId(null); }
//             loadDatabase();
//         }
//     };
//
//     const deleteItem = async (e, communityId, aptId, itemId) => {
//         e.stopPropagation();
//         if (window.confirm(t('confirmDelItem'))) {
//             await fetch(`/api/items/${itemId}`, {
//                 method: 'DELETE',
//                 headers: { 'X-XSRF-TOKEN': getCsrfToken() }
//             });
//             loadDatabase();
//         }
//     };
//
//     const handleOpenNewForm = () => {
//         setEditingItemId(null);
//         setWorkOrderTitle(""); setWorkOrderNotes(""); setWorkOrderMaterialCost(""); setWorkOrderLaborCost("");
//         setWorkOrderVendor(""); setWorkOrderEntryPermission(false); setWorkOrderIsOutsourced(false); setShowAiPanel(false); setUploadedFiles([]);
//         setWorkOrderId(generateWorkOrderId());
//         const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
//         setWorkOrderDate(now.toISOString().slice(0, 16));
//         setIsFormOpen(true);
//     };
//
//     const startEdit = (item) => {
//         setEditingItemId(item.id);
//         setWorkOrderId(item.workOrderId || generateWorkOrderId());
//         setWorkOrderCategory(item.category || "catGeneral");
//         setWorkOrderTitle(item.title);
//         setWorkOrderStatus(item.status || "Todo");
//         setWorkOrderNotes(item.notes || "");
//         setWorkOrderPriority(item.priority || "prioNormal");
//         setWorkOrderVendor(item.vendor || "");
//         setWorkOrderIsOutsourced(item.isOutsourced || false);
//         setWorkOrderEntryPermission(item.entryPermission || false);
//         setWorkOrderMaterialCost(item.materialCost || "");
//         setWorkOrderLaborCost(item.laborCost || "");
//         if (item.date) { const d = new Date(item.date); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); setWorkOrderDate(d.toISOString().slice(0, 16)); }
//
//         if (item.attachments) {
//             setUploadedFiles(item.attachments.map((url, idx) => ({ id: `existing_${idx}`, name: `${t('attachmentName')} ${idx+1}`, url: url, rawFile: null })));
//         } else { setUploadedFiles([]); }
//
//         setIsFormOpen(true);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     const saveItem = async () => {
//         if (!workOrderTitle || !selectedApartmentId || isSaving) return;
//         setIsSaving(true);
//
//         const total = (Number(workOrderMaterialCost) || 0) + (Number(workOrderLaborCost) || 0);
//
//         const formData = new FormData();
//         formData.append("workOrderId", workOrderId);
//         formData.append("title", workOrderTitle);
//         formData.append("price", total);
//         formData.append("category", workOrderCategory);
//         formData.append("date", workOrderDate);
//         formData.append("notes", workOrderNotes);
//         formData.append("status", workOrderStatus);
//         formData.append("priority", workOrderPriority);
//         formData.append("vendor", workOrderVendor);
//         formData.append("isOutsourced", workOrderIsOutsourced);
//         formData.append("entryPermission", workOrderEntryPermission);
//         formData.append("materialCost", workOrderMaterialCost);
//         formData.append("laborCost", workOrderLaborCost);
//
//         uploadedFiles.forEach(file => {
//             if (file.rawFile) formData.append("attachments", file.rawFile);
//             else if (file.url) formData.append("retainedAttachments", file.url);
//         });
//
//         const url = editingItemId ? `/api/items/${editingItemId}` : `/api/apartments/${selectedApartmentId}/items`;
//         const method = editingItemId ? 'PUT' : 'POST';
//
//         try {
//             await fetch(url, {
//                 method: method,
//                 headers: { 'X-XSRF-TOKEN': getCsrfToken() },
//                 body: formData
//             });
//             setEditingItemId(null); setIsFormOpen(false);
//             loadDatabase();
//         } catch (error) {
//             console.error("Kayıt başarısız", error);
//         } finally {
//             setIsSaving(false);
//         }
//     };
//
//     const updateItemStatus = async (communityId, aptId, itemId, newStatus) => {
//         await fetch(`/api/items/${itemId}/status?status=${newStatus}`, {
//             method: 'PUT',
//             headers: { 'X-XSRF-TOKEN': getCsrfToken() }
//         });
//         loadDatabase();
//     };
//
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedFiles(prev => [...prev, ...files.map(file => ({ id: Math.random(), name: file.name, url: URL.createObjectURL(file), rawFile: file }))].slice(0, MAX_FILES));
//     };
//     const removeFile = (id) => setUploadedFiles(prev => prev.filter(f => f.id !== id));
//
//     const fetchAiSuggestions = () => {
//         setShowAiPanel(true); setIsAiLoading(true); setAiVendors([]);
//         setTimeout(() => {
//             const categoryVendors = mockAiDatabase[workOrderCategory] || mockAiDatabase['catGeneral'];
//             setAiVendors(categoryVendors.filter(v => v.dist <= searchRadius));
//             setIsAiLoading(false);
//         }, 800);
//     };
//
//    const handleLogout = () => {
//         sessionStorage.clear();
//         setIsAuthenticated(false);
//         setCommunities([]);
//
//         fetch("/logout", {
//             method: "POST",
//             credentials: "include",
//             headers: {
//                 'X-XSRF-TOKEN': getCsrfToken()
//             }
//         })
//         .finally(() => {
//             window.location.replace("/");
//         });
//     };
//
//     const selectedCommunity = communities.find(c => c.id === selectedCommunityId);
//     const selectedApartment = selectedCommunity?.apartments?.find(a => a.id === selectedApartmentId);
//     const filteredCommunities = communities.filter(c => (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()));
//
//     // GİRİŞ EKRANI
//     if (!isAuthenticated || !isLangChecked) return (
//         <div className="min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative flex flex-col justify-center p-6">
//             <div className="absolute inset-0 bg-slate-900/40 z-0"></div>
//             <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-12 text-center mx-auto shadow-2xl border border-slate-200">
//                 <div className="w-20 h-20 bg-blue-800 text-white rounded-xl flex items-center justify-center mx-auto mb-8 shadow-md"><Icons.Layout size={36} /></div>
//                 <h2 className="text-3xl font-bold mb-2 text-slate-900 tracking-tight">{t('title')}</h2>
//                 <p className="text-slate-500 font-medium mb-10 text-base">Enterprise Management</p>
//
//                 <a
//                     href="/oauth2/authorization/google"
//                     className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg text-center flex items-center justify-center cursor-pointer block"
//                 >
//                     {t('googleLogin')}
//                 </a>
//             </div>
//         </div>
//     );
//
//     // YÖNETİM PANELİ
//     return (
//         <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
//             <header className="bg-slate-900 text-white p-5 sticky top-0 z-40 shadow-md">
//                 <div className="max-w-[100rem] mx-auto w-full flex justify-between items-center px-4">
//                     <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setSelectedCommunityId(null); setSelectedApartmentId(null); }}>
//                         <div className="bg-blue-600 p-3 rounded-lg shadow-sm"><Icons.Layout size={22} className="text-white" /></div>
//                         <h1 className="text-2xl font-bold tracking-wide">{t('title')}</h1>
//                     </div>
//                     <div className="flex items-center gap-5">
//                         <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-base font-semibold text-slate-200 outline-none cursor-pointer hover:bg-slate-700 transition-colors" value={lang} onChange={e => { setLang(e.target.value); localStorage.setItem('appLanguage', e.target.value); }}>
//                             <option value="en">English</option><option value="tr">Türkçe</option>
//                         </select>
//
//                           <button
//                               onClick={handleLogout}
//                               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer" >
//                                {t('logout')}
//                           </button>
//                     </div>
//                 </div>
//             </header>
//
//             <div className="max-w-[100rem] mx-auto w-full p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-start">
//
//                 <aside className="lg:col-span-3 flex flex-col gap-6 self-stretch">
//                     <button onClick={() => { setSelectedCommunityId(null); setSelectedApartmentId(null); }} className="w-full p-5 rounded-xl font-semibold text-lg flex items-center gap-4 bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all text-slate-700">
//                         <div className="bg-blue-50 p-2 rounded-lg"><Icons.Home size={22} className="text-blue-700" /></div> {t('generalPortfolio')}
//                     </button>
//
//                     <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
//                         <div className="relative mb-6"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Search size={18} /></span><input className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 outline-none text-base font-medium placeholder-slate-400 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" placeholder={t('searchPlaceholder')} onChange={e => setSearchTerm(e.target.value)} /></div>
//
//                         <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
//                             {filteredCommunities.map(comm => (
//                                 <div key={comm.id} className="w-full rounded-xl border border-transparent hover:bg-slate-50 transition-all group flex items-center pr-2">
//                                     <button onClick={() => { setSelectedCommunityId(comm.id); setSelectedApartmentId(null); }} className="flex-1 p-4 text-left font-semibold text-base text-slate-700 group-hover:text-blue-700">{comm.name}</button>
//                                     <button onClick={(e) => deleteCommunity(e, comm.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition-all"><Icons.Trash size={18} /></button>
//                                 </div>
//                             ))}
//                         </div>
//                         <form onSubmit={handleAddCommunity} className="mt-6 flex gap-3"><input required className="flex-1 p-4 bg-white border border-slate-200 rounded-xl text-base font-semibold outline-none focus:border-blue-600 transition-all shadow-sm" placeholder={t('siteNamePlaceholder')} value={newCommunityName} onChange={e => setNewCommunityName(e.target.value)} /><button className="bg-slate-800 hover:bg-blue-700 text-white px-5 rounded-xl transition-colors shadow-sm"><Icons.Plus size={24}/></button></form>
//                     </div>
//
//                     {/* YENİ EKLENEN: MİNİ İSTATİSTİK VE YARDIM DESTEK KUTUSU */}
//                     <div className="mt-auto pt-2 space-y-6">
//                         {/* Mini İstatistikler */}
//                         <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
//                             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('statsTitle')}</h4>
//                             <div className="space-y-4">
//                                 <div>
//                                     <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
//                                         <span>{t('occupancyRate')}</span><span>85%</span>
//                                     </div>
//                                     <div className="w-full bg-slate-100 rounded-full h-2">
//                                         <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
//                                         <span>{t('completionRate')}</span><span>92%</span>
//                                     </div>
//                                     <div className="w-full bg-slate-100 rounded-full h-2">
//                                         <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Yardım ve Destek Kutusu */}
//                         <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5 shadow-sm relative overflow-hidden group">
//                             <div className="absolute -right-2 -top-2 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-500">💡</div>
//                             <h4 className="text-sm font-bold text-indigo-900 mb-3 relative z-10">{t('helpSupport')}</h4>
//                             <ul className="space-y-3 text-xs font-bold text-indigo-700 relative z-10">
//                                 <li><a href="#" className="hover:text-indigo-900 flex items-center gap-2 transition-colors"><span>👉</span> {t('howToUse')}</a></li>
//                                 <li><a href="#" className="hover:text-indigo-900 flex items-center gap-2 transition-colors"><span>🎧</span> {t('contactSupport')}</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </aside>
//
//                 <main className="lg:col-span-9">
//                     {selectedCommunityId === null && (
//                         <div className="space-y-8 animate-in">
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                                 {[
//                                     { label: t('totalSites'), val: communities.length, icon: Icons.Layout, color: "text-blue-600" },
//                                     { label: t('totalApts'), val: communities.reduce((acc, c) => acc + (c.apartments?.length || 0), 0), icon: Icons.Home, color: "text-emerald-600" },
//                                     { label: t('pendingTasks'), val: communities.reduce((acc, c) => acc + c.apartments?.reduce((a, apt) => a + (apt.items?.filter(i => i.status !== 'Complete').length || 0), 0), 0), icon: Icons.Edit, color: "text-amber-600" },
//                                     { label: t('totalExpense'), val: `$${communities.reduce((acc, c) => acc + c.apartments?.reduce((a, apt) => a + (apt.items?.reduce((sum, i) => sum + (Number(i.price) || 0), 0) || 0), 0), 0)}`, icon: Icons.Plus, color: "text-rose-600" }
//                                 ].map((kpi, i) => (
//                                     <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
//                                         <div className="bg-slate-50 p-4 rounded-xl"><kpi.icon size={28} className={kpi.color} /></div>
//                                         <div>
//                                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
//                                             <p className="text-3xl font-black text-slate-800 mt-1">{kpi.val}</p>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//
//                             {/* YENİ EKLENEN: HIZLI İŞLEMLER KUTUSU */}
//                             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//                                 <h3 className="text-base font-bold text-slate-800 mb-5">{t('quickActions')}</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all group text-left shadow-sm">
//                                         <div className="text-2xl group-hover:scale-110 transition-transform">➕</div>
//                                         <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-700">{t('newVendor')}</span>
//                                     </button>
//                                     <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all group text-left shadow-sm">
//                                         <div className="text-2xl group-hover:scale-110 transition-transform">📊</div>
//                                         <span className="font-semibold text-sm text-slate-700 group-hover:text-emerald-700">{t('genReport')}</span>
//                                     </button>
//                                     <button className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 transition-all group text-left shadow-sm">
//                                         <div className="text-2xl group-hover:scale-110 transition-transform">✉️</div>
//                                         <span className="font-semibold text-sm text-slate-700 group-hover:text-amber-700">{t('sendNotice')}</span>
//                                     </button>
//                                 </div>
//                             </div>
//
//                             {/* YENİ EKLENEN: EMPTY STATE (Hiç site yoksa gösterilir) */}
//                             {communities.length === 0 && (
//                                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-12 text-center shadow-sm">
//                                     <div className="text-6xl mb-5 opacity-80">🏢</div>
//                                     <h3 className="text-2xl font-black text-indigo-900 mb-2">{t('emptyPortfolioTitle')}</h3>
//                                     <p className="text-indigo-700 font-medium">{t('emptyPortfolioSub')}</p>
//                                 </div>
//                             )}
//
//                             {/* Mevcut Acil İşler Kutusu (Eğer site varsa gösterilir) */}
//                             {communities.length > 0 && (
//                                 <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                                     <div className="p-6 border-b border-slate-100 font-bold text-xl text-slate-800">{t('urgentTasksTitle')}</div>
//                                     <div className="divide-y divide-slate-100">
//                                         {communities.flatMap(c => c.apartments?.flatMap(a => a.items?.filter(i => i.priority === 'prioEmergency')) || []).length > 0 ?
//                                             communities.flatMap(c => c.apartments?.flatMap(a => a.items?.filter(i => i.priority === 'prioEmergency').map(i => ({...i, apt: a.id, comm: c.name}))) || []).map((item, idx) => (
//                                                 <div key={idx} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedCommunityId(communities.find(c => c.name === item.comm).id); setSelectedApartmentId(item.apt); }}>
//                                                     <div className="flex gap-5 items-center">
//                                                         <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1.5 rounded-md">{t('urgentBadge')}</span>
//                                                         <div>
//                                                             <p className="text-base font-bold text-slate-800">{item.title}</p>
//                                                             <p className="text-sm text-slate-500 mt-1">{item.comm} / <span className="font-semibold text-indigo-600">{item.apt}</span></p>
//                                                         </div>
//                                                     </div>
//                                                     <div className="font-black text-emerald-700 text-xl">${item.price}</div>
//                                                 </div>
//                                             )) : <p className="p-10 text-center text-slate-400 font-medium text-lg">{t('noUrgentTasks')}</p>
//                                         }
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//
//                     {selectedCommunityId !== null && selectedApartmentId === null && selectedCommunity && (
//                         <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
//                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 border-b border-slate-100 pb-6">
//                                 <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{selectedCommunity.name}</h2>
//                                 <form onSubmit={handleAddApartment} className="flex gap-3"><input required className="p-4 bg-white rounded-xl outline-none font-medium text-base border border-slate-200 focus:border-blue-600 w-64 shadow-sm" placeholder={t('aptNoPlaceholder')} value={newAptName} onChange={e => setNewAptName(e.target.value)} /><button className="bg-blue-700 hover:bg-blue-800 text-white px-8 rounded-xl font-semibold text-base shadow-sm transition-colors">{t('addBtn')}</button></form>
//                             </div>
//                             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//                                 {(selectedCommunity.apartments || []).map(apt => (
//                                     <div key={apt.id} className="relative border border-slate-200 p-8 rounded-2xl cursor-pointer hover:border-blue-400 hover:shadow-md transition-all bg-slate-50/50 text-center group" onClick={() => setSelectedApartmentId(apt.id)}>
//                                         <button onClick={(e) => deleteApartment(e, selectedCommunity.id, apt.id)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-rose-600 transition-all"><Icons.Trash size={18} /></button>
//                                         <h4 className="text-3xl font-bold text-slate-800 mb-3">{apt.id}</h4>
//                                         <div className="text-lg font-bold text-emerald-700 bg-emerald-100/50 py-1.5 px-4 rounded-xl inline-block border border-emerald-200/50">${(apt.items || []).reduce((sum, i) => sum + (Number(i.price) || 0), 0)}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//
//                     {selectedCommunityId !== null && selectedApartmentId !== null && selectedApartment && (
//                         <div className="space-y-6">
//
//                             <div className="flex justify-between items-center bg-white p-5 px-6 rounded-2xl border border-slate-200 shadow-sm">
//                                 <div className="flex items-center gap-5">
//                                     <button onClick={() => setSelectedApartmentId(null)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"><Icons.ArrowLeft size={20} /></button>
//                                     <h2 className="text-xl font-bold text-slate-500">{selectedCommunity.name} <span className="mx-2 text-slate-300">/</span> <span className="text-blue-700">{selectedApartment.id}</span></h2>
//                                 </div>
//                                 {!isFormOpen && (
//                                     <button onClick={handleOpenNewForm} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2">
//                                         <Icons.Plus size={18} /> {t('createWorkItem')}
//                                     </button>
//                                 )}
//                             </div>
//
//                             <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
//
//                                 <div className={`space-y-6 transition-all duration-300 ${isFormOpen ? 'xl:col-span-6' : 'xl:col-span-12'}`}>
//                                     {(selectedApartment.items || []).length === 0 && !isFormOpen && (
//                                         <div className="text-center p-12 bg-white rounded-3xl border border-slate-200 border-dashed text-slate-400">
//                                             {t('noItems')}
//                                         </div>
//                                     )}
//
//                                     {(selectedApartment.items || []).map(item => (
//                                         <div key={item.id} className={`bg-white border-l-8 rounded-3xl p-6 shadow-sm border-y border-r border-slate-200 transition-all hover:shadow-md ${item.priority === 'prioEmergency' ? 'border-l-rose-600' : item.priority === 'prioHigh' ? 'border-l-orange-500' : 'border-l-blue-600'}`}>
//                                             <div className="flex justify-between items-start mb-6">
//                                                 <div className="flex flex-wrap gap-3 items-center">
//                                                     <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-200">{t(item.category || 'catGeneral')}</span>
//                                                     <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${item.priority === 'prioEmergency' ? 'bg-rose-50 text-rose-700 border-rose-200' : item.priority === 'prioHigh' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{t(item.priority || 'prioNormal')}</span>
//
//                                                     <select
//                                                         value={item.status || "Todo"}
//                                                         onChange={(e) => updateItemStatus(selectedCommunity.id, selectedApartment.id, item.id, e.target.value)}
//                                                         className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border outline-none cursor-pointer ml-1 ${
//                                                             item.status === 'Complete' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
//                                                             item.status === 'InProgress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
//                                                             'bg-slate-50 text-slate-600 border-slate-200'
//                                                         }`}
//                                                     >
//                                                         <option value="Todo">{t('todo')}</option>
//                                                         <option value="InProgress">{t('inProgress')}</option>
//                                                         <option value="Complete">{t('complete')}</option>
//                                                     </select>
//
//                                                     <span className="ml-2 font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{item.workOrderId}</span>
//                                                 </div>
//                                                 <div className="text-3xl font-bold text-emerald-700">${item.price}</div>
//                                             </div>
//
//                                             <h3 className="text-xl font-bold text-slate-900 mb-5">{item.title}</h3>
//
//                                             <div className="grid grid-cols-2 gap-5 p-5 bg-slate-50/80 rounded-2xl text-sm font-medium text-slate-600 border border-slate-200">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100"><Icons.Lock size={16} className="text-slate-400"/></div>
//                                                     <div>
//                                                         <span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">{t('vendorLabel')}</span>
//                                                         <span className="text-slate-800 font-semibold flex items-center gap-2">
//                                                             {item.vendor || '—'}
//                                                             {item.isOutsourced && <span className="text-[9px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-md">OUTSOURCED</span>}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center gap-4"><div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100"><Icons.Home size={16} className="text-slate-400"/></div> <div><span className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">{t('permissionLabel')}</span><span className={`font-semibold ${item.entryPermission ? "text-emerald-700" : "text-rose-600"}`}>{item.entryPermission ? t('granted') : t('required')}</span></div></div>
//                                             </div>
//
//                                             {item.attachments && item.attachments.length > 0 && (
//                                                 <div className="flex flex-wrap gap-2 mt-5">
//                                                     {item.attachments.map((fileUrl, idx) => (
//                                                         <button key={idx} onClick={() => handlePreview(fileUrl)} className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
//                                                             <Icons.File size={14} />
//                                                             <span className="truncate max-w-[120px]">{t('attachmentName')} {idx+1}</span>
//                                                         </button>
//                                                     ))}
//                                                 </div>
//                                             )}
//
//                                             <div className="flex justify-between items-center mt-5 pt-5 border-t border-slate-100">
//                                                 <span className="text-xs font-semibold text-slate-400">
//                                                     {item.date ? new Date(item.date).toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
//                                                 </span>
//                                                 <div className="flex gap-2">
//                                                     <button onClick={() => startEdit(item)} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition-colors"><Icons.Edit size={18} /></button>
//                                                     <button onClick={(e) => deleteItem(e, selectedCommunity.id, selectedApartment.id, item.id)} className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"><Icons.Trash size={18} /></button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//
//                                 {isFormOpen && (
//                                     <div className="xl:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl h-fit sticky top-28 animate-in">
//                                         <div className="flex justify-between items-start mb-6 border-b border-slate-100 pb-5">
//                                             <div>
//                                                 <div className="text-xs font-mono font-black text-indigo-500 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block mb-3 border border-indigo-100 shadow-sm">{workOrderId}</div>
//                                                 <h3 className={`text-2xl font-bold transition-colors ${editingItemId ? 'text-emerald-700' : 'text-slate-900'}`}>
//                                                     {editingItemId ? t('updateOrder') : t('saveOrder')}
//                                                 </h3>
//                                             </div>
//                                             <button onClick={() => setIsFormOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg">✕</button>
//                                         </div>
//
//                                         <div className="space-y-6">
//                                             <div>
//                                                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('jobTitle')}</label>
//                                                 <input className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-lg outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderTitle} onChange={e => setWorkOrderTitle(e.target.value)} />
//                                             </div>
//
//                                             <div className="grid grid-cols-2 gap-5">
//                                                 <div>
//                                                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('category')}</label>
//                                                     <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderCategory} onChange={e => setWorkOrderCategory(e.target.value)}>
//                                                         <option value="catGeneral">{t('catGeneral')}</option><option value="catPlumbing">{t('catPlumbing')}</option><option value="catElectrical">{t('catElectrical')}</option><option value="catAppliance">{t('catAppliance')}</option><option value="catFlooring">{t('catFlooring')}</option><option value="catHVAC">{t('catHVAC')}</option><option value="catOther">{t('catOther')}</option>
//                                                     </select>
//                                                 </div>
//                                                 <div>
//                                                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('priority')}</label>
//                                                     <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderPriority} onChange={e => setWorkOrderPriority(e.target.value)}>
//                                                         <option value="prioLow">{t('prioLow')}</option><option value="prioNormal">{t('prioNormal')}</option><option value="prioHigh">{t('prioHigh')}</option><option value="prioEmergency">{t('prioEmergency')}</option>
//                                                     </select>
//                                                 </div>
//                                             </div>
//
//                                             <div>
//                                                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('status')}</label>
//                                                 <select className="w-full p-4 bg-white border border-slate-300 rounded-xl font-semibold text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" value={workOrderStatus} onChange={e => setWorkOrderStatus(e.target.value)}>
//                                                     <option value="Todo">{t('todo')}</option><option value="InProgress">{t('inProgress')}</option><option value="Complete">{t('complete')}</option>
//                                                 </select>
//                                             </div>
//
//                                             <div>
//                                                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('vendorLabel')}</label>
//                                                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
//                                                     <input className="flex-1 w-full p-4 bg-white border border-slate-300 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" placeholder={t('vendorPlaceholder')} value={workOrderVendor} onChange={e => setWorkOrderVendor(e.target.value)} />
//
//                                                     <label className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors w-full sm:w-auto shrink-0 shadow-sm">
//                                                         <input type="checkbox" className="w-4 h-4 accent-blue-700 cursor-pointer rounded" checked={workOrderIsOutsourced} onChange={e => setWorkOrderIsOutsourced(e.target.checked)} />
//                                                         <span className="text-sm font-semibold text-slate-700">{t('outsourced')}</span>
//                                                     </label>
//                                                 </div>
//
//                                                 {workOrderIsOutsourced && (
//                                                     <div className="mt-4 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
//                                                         <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
//                                                             <div className="flex items-center gap-3">
//                                                                 <span className="text-xs font-bold text-indigo-900">{t('radius')}</span>
//                                                                 <select className="bg-white border border-indigo-200 text-indigo-800 text-xs font-semibold rounded-lg px-3 py-2 outline-none" value={searchRadius} onChange={e => setSearchRadius(Number(e.target.value))}>
//                                                                     <option value={5}>5 {t('miles')}</option>
//                                                                     <option value={10}>10 {t('miles')}</option>
//                                                                     <option value={25}>25 {t('miles')}</option>
//                                                                 </select>
//                                                             </div>
//                                                             <button type="button" onClick={fetchAiSuggestions} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all">
//                                                                 {t('aiSuggestBtn')}
//                                                             </button>
//                                                         </div>
//
//                                                         {showAiPanel && (
//                                                             <div className="bg-white rounded-xl border border-indigo-100 overflow-hidden shadow-inner">
//                                                                 {isAiLoading ? (
//                                                                     <div className="p-8 text-center text-indigo-500 text-sm font-semibold animate-pulse">{t('aiSearching')}</div>
//                                                                 ) : aiVendors.length > 0 ? (
//                                                                     <div className="divide-y divide-slate-100">
//                                                                         {aiVendors.map(v => (
//                                                                             <div key={v.id} className="p-4 hover:bg-slate-50 flex justify-between items-center transition-colors">
//                                                                                 <div>
//                                                                                     <p className="font-bold text-sm text-slate-800">{v.name} <span className="text-[9px] ml-2 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{v.dist} {t('miles')}</span></p>
//                                                                                     <p className="text-[11px] text-slate-500 mt-1">{v.phone} • {v.email}</p>
//                                                                                 </div>
//                                                                                 <button type="button" onClick={() => { setWorkOrderVendor(v.name); setShowAiPanel(false); }} className="bg-slate-100 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors">
//                                                                                     {t('selectBtn')}
//                                                                                 </button>
//                                                                             </div>
//                                                                         ))}
//                                                                     </div>
//                                                                 ) : (
//                                                                     <div className="p-6 text-center text-slate-500 text-xs font-medium">{t('noVendorsFound')}</div>
//                                                                 )}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 )}
//                                             </div>
//
//                                             <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
//                                                 <div>
//                                                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('materialCost')}</label>
//                                                     <input type="number" className="w-full p-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none text-sm shadow-sm focus:border-blue-600" placeholder="0.00" value={workOrderMaterialCost} onChange={e => setWorkOrderMaterialCost(e.target.value)} />
//                                                 </div>
//                                                 <div>
//                                                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">{t('laborCost')}</label>
//                                                     <input type="number" className="w-full p-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 outline-none text-sm shadow-sm focus:border-blue-600" placeholder="0.00" value={workOrderLaborCost} onChange={e => setWorkOrderLaborCost(e.target.value)} />
//                                                 </div>
//                                                 <div className="col-span-2 pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
//                                                     <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t('totalCost')}</span>
//                                                     <span className="text-xl font-bold text-emerald-700">${(Number(workOrderMaterialCost) || 0) + (Number(workOrderLaborCost) || 0)}</span>
//                                                 </div>
//                                             </div>
//
//                                             <label className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
//                                                 <input type="checkbox" className="w-4 h-4 accent-blue-700 cursor-pointer rounded" checked={workOrderEntryPermission} onChange={e => setWorkOrderEntryPermission(e.target.checked)} />
//                                                 <span className="text-sm font-semibold text-slate-700">{t('entryPermission')}</span>
//                                             </label>
//
//                                             <textarea className="w-full p-3 bg-white border border-slate-300 rounded-xl h-24 outline-none resize-none text-sm font-medium focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm" placeholder={t('notes')} value={workOrderNotes} onChange={e => setWorkOrderNotes(e.target.value)} />
//
//                                             <div className="pt-2">
//                                                 <button type="button" onClick={() => document.getElementById('workorder-smart-upload').click()} className="w-full flex justify-center items-center gap-2 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all py-5 rounded-xl font-bold text-sm text-slate-600 cursor-pointer">
//                                                     <Icons.Camera size={18} className="text-slate-400"/> {t('uploadFile')}
//                                                 </button>
//                                                 <input id="workorder-smart-upload" type="file" multiple accept="image/*,application/pdf,video/*" capture="environment" className="hidden" onChange={handleFileChange} />
//                                             </div>
//
//                                             {uploadedFiles.length > 0 && (
//                                                 <div className="grid grid-cols-1 gap-2 pt-1">
//                                                     {uploadedFiles.map(file => (
//                                                         <div key={file.id || Math.random()} className="flex justify-between items-center bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm cursor-pointer hover:border-blue-400 transition-colors" onClick={() => handlePreview(file.url)}>
//                                                             <div className="flex items-center gap-2 truncate">
//                                                                 <Icons.File size={16} className="text-blue-600 shrink-0" />
//                                                                 <span className="text-xs font-semibold text-slate-700 truncate">{file.name || t('attachmentName')}</span>
//                                                             </div>
//                                                             <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(file.id); }} className="text-rose-600 font-bold p-1 hover:bg-rose-50 rounded text-xs">✕</button>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//
//                                             <div className="pt-4">
//                                                 <button disabled={isSaving} onClick={saveItem} className={`w-full py-5 transition-all text-white font-bold rounded-2xl uppercase tracking-widest text-sm shadow-md ${isSaving ? 'bg-slate-400 cursor-not-allowed' : editingItemId ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-700 hover:bg-blue-800'}`}>
//                                                     {isSaving ? t('saving') : editingItemId ? t('updateOrder') : t('saveOrder')}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     );
// }