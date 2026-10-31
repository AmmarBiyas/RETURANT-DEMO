// رقم هاتف المطعم (مع مفتاح الدولة بدون + أو أصفار إضافية)
// مثلاً للعراق: 9647700000000
const RESTAURANT_PHONE = "9647700000000";

// مصفوفة قائمة الطعام (تعدل عليها بسهولة بدون لمس الـ HTML)
const menuItems = [
  {
    id: 1,
    title: "كلاسيك سنجل برجر",
    category: "burger",
    price: "7,000 د.ع",
    desc: "قطعة لحم عراقي 150غ مشوية، جبن تشيدر مذوب، خس، طماطم، صوص المحل السري.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "دبل تريبل برجر الضيم",
    category: "burger",
    price: "11,000 د.ع",
    desc: "طبقتين لحم صافي مع دبل جبن مقرمش وقطع بصل مكرمل وصوص باربكيو مدخن.",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "كرسبي تشيكن مدمر",
    category: "burger",
    price: "8,000 د.ع",
    desc: "صدر دجاج مقرمش متبل بخلطة حارة خاصة، خس، صلصة الرانش اللذيذة.",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "بطاطا تشيزي باللحم",
    category: "sides",
    price: "5,000 د.ع",
    desc: "بطاطا مبهرة مضاف إليها صوص الجبن السائل مع لحم مفروم وهالبينو حار.",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    title: "أصابع موزاريلا مقرمشة",
    category: "sides",
    price: "4,000 د.ع",
    desc: "4 أصابع جبن موزاريلا إيطالي مقلية تقدم مع صوص المارينارا الخاص.",
    image: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "موهيتو بلوبيري منعش",
    category: "drinks",
    price: "3,000 د.ع",
    desc: "مشروب غازي مثلج مع نكهة التوت الأزرق، نعناع طازج وشريحة ليمون.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80"
  }
];

const menuContainer = document.getElementById("menu-container");
const filterButtons = document.querySelectorAll(".filter-btn");

// دالة عرض الوجبات في الواجهة
function renderMenu(items) {
  menuContainer.innerHTML = items.map(item => `
    <div class="menu-card bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition duration-300">
      <div>
        <div class="h-48 overflow-hidden">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover hover:scale-105 transition duration-500" loading="lazy">
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-lg font-black">${item.title}</h3>
            <span class="text-amber-500 font-extrabold text-sm">${item.price}</span>
          </div>
          <p class="text-zinc-400 text-xs leading-relaxed mb-4">${item.desc}</p>
        </div>
      </div>
      <div class="p-5 pt-0">
        <button onclick="orderViaWhatsApp('${item.title}', '${item.price}')" class="w-full bg-zinc-800 hover:bg-emerald-600 hover:text-white text-zinc-200 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition duration-200">
          <span>اطلب عبر واتساب</span>
          <span>💬</span>
        </button>
      </div>
    </div>
  `).join("");
}

// دالة التحويل للواتساب المشفرة والآمنة 100%
function orderViaWhatsApp(itemName, itemPrice) {
  const safeMessage = `مرحباً، أود طلب وجبة:
🍔 الوجبة: ${itemName}
💰 السعر: ${itemPrice}
يرجى تأكيد التوصيل ومعرفة المدة التقريبية. شكراً لكم!`;

  // استخدام encodeURIComponent لتأمين النص ومنع تشوه الروابط أو استغلالها
  const encodedText = encodeURIComponent(safeMessage);
  const whatsappUrl = `https://wa.me/${RESTAURANT_PHONE}?text=${encodedText}`;

  // فتح المحادثة في نافذة جديدة
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

// برمجة فلاتر التصنيفات (برجر، مقبلات، مشروبات)
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active-filter"));
    button.classList.add("active-filter");

    const selectedCategory = button.getAttribute("data-category");
    if (selectedCategory === "all") {
      renderMenu(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category === selectedCategory);
      renderMenu(filtered);
    }
  });
});

// تشغيل العرض عند فتح الصفحة أول مرة
document.addEventListener("DOMContentLoaded", () => {
  renderMenu(menuItems);
});