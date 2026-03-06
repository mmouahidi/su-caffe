"use client"

export type Locale = "fr" | "ar" | "en"

export const translations = {
  fr: {
    // Header
    nav: {
      origins: "Nos Origines",
      boutique: "La Boutique",
      mastery: "Notre Savoir-Faire",
      contact: "Contact",
    },
    // Hero
    hero: {
      tagline: "Précision dans Chaque Infusion. Héritage dans Chaque Tasse.",
      description: "Découvrez le summum de la maîtrise du café. Grains soigneusement sélectionnés, torréfaction artisanale, une expérience inégalée.",
      cta: "Découvrir la Collection",
    },
    // Boutique
    boutique: {
      title: "La Boutique",
      origin: "Origine",
      roast: "Torréfaction",
      weight: "Poids",
      addToCart: "Ajouter au Panier",
      outOfStock: "Rupture de Stock",
      bestseller: "Best-seller",
    },
    // Mastery
    mastery: {
      title: "Notre Savoir-Faire",
      subtitle: "L'Art de la Perfection",
      description: "Chaque grain raconte une histoire. Du cœur des terres montagneuses où nos grains sont cultivés, jusqu'à la torréfaction minutieuse dans notre atelier, nous honorons la tradition tout en embrassant l'innovation.",
      philosophy: "Notre philosophie est simple : la qualité sans compromis. Nous sélectionnons uniquement les 2% des meilleurs grains arabica du monde, torréfiés en petits lots pour révéler leur caractère unique.",
      stats: {
        years: "Années d'Excellence",
        countries: "Pays Servis",
        blends: "Mélanges Uniques",
      },
    },
    // Footer
    footer: {
      newsletter: {
        title: "Rejoignez le Cercle Privé",
        description: "Accès exclusif aux nouvelles collections, événements privés et offres réservées aux membres.",
        placeholder: "Votre adresse e-mail",
        button: "S'inscrire",
        success: "Bienvenue dans le cercle !",
      },
      links: {
        boutique: "La Boutique",
        about: "Notre Histoire",
        contact: "Contact",
        shipping: "Livraison",
        returns: "Retours",
        faq: "FAQ",
        terms: "Conditions",
        privacy: "Confidentialité",
      },
      copyright: "Tous droits réservés.",
    },
    // Cart
    cart: {
      title: "Votre Panier",
      empty: "Votre panier est vide",
      emptyDescription: "Découvrez notre collection de cafés d'exception",
      continueShopping: "Continuer les Achats",
      subtotal: "Sous-total",
      shipping: "Livraison",
      shippingNote: "Calculée à la commande",
      total: "Total",
      checkout: "Commander via WhatsApp",
      remove: "Retirer",
    },
    // Checkout Form
    checkout: {
      title: "Finaliser la Commande",
      subtitle: "Paiement à la livraison (COD)",
      name: "Nom Complet",
      namePlaceholder: "Votre nom",
      phone: "Téléphone",
      phonePlaceholder: "+212 6XX XXX XXX",
      address: "Adresse",
      addressPlaceholder: "Votre adresse complète",
      city: "Ville",
      cityPlaceholder: "Votre ville",
      notes: "Notes (optionnel)",
      notesPlaceholder: "Instructions de livraison...",
      submit: "Confirmer & Envoyer via WhatsApp",
      back: "Retour au panier",
      orderSummary: "Résumé de la Commande",
      items: "articles",
    },
    // WhatsApp Message
    whatsapp: {
      greeting: "Bonjour! Je souhaite passer une commande:",
      orderDetails: "Détails de la commande",
      customerInfo: "Informations client",
      name: "Nom",
      phone: "Téléphone",
      address: "Adresse",
      city: "Ville",
      notes: "Notes",
      total: "Total",
      paymentMethod: "Paiement à la livraison",
    },
    // Origins Journey
    origins: {
      title: "Notre Voyage",
      subtitle: "Quatre terroirs d'exception. Un mélange unique.",
      altitude: "Altitude",
      notes: "Notes",
      blendNote: "Le secret de nos mélanges: l'équilibre parfait entre ces quatre terroirs.",
      items: {
        ethiopia: {
          country: "Éthiopie",
          title: "Le Berceau du Café",
          description: "Là où tout a commencé. Dans les hauts plateaux éthiopiens, nos grains d'Arabica hérité développent des notes florales et fruitées uniques, cultivés selon des traditions millénaires.",
          altitude: "1,500 - 2,200m",
          notes: "Floral, Fruité, Agrumes",
        },
        colombia: {
          country: "Colombie",
          title: "L'Excellence Andine",
          description: "Au cœur des Andes colombiennes, nos grains d'Arabica mûrissent lentement sous l'ombre des bananiers, développant une acidité brillante et un corps soyeux incomparable.",
          altitude: "1,200 - 1,800m",
          notes: "Caramel, Noisette, Chocolat",
        },
        uganda: {
          country: "Ouganda",
          title: "La Force Africaine",
          description: "Des montagnes Rwenzori, notre Robusta d'exception apporte une intensité profonde et une crema onctueuse. La puissance de l'Afrique dans chaque tasse.",
          altitude: "1,200 - 1,500m",
          notes: "Intense, Boisé, Cacao",
        },
        india: {
          country: "Inde",
          title: "Le Mystère Malabar",
          description: "Sous les pluies de mousson des Ghâts occidentaux, nos grains développent un caractère unique. Un voyage sensoriel entre épices et douceur tropicale.",
          altitude: "1,000 - 1,500m",
          notes: "Épicé, Terreux, Doux",
        },
      },
    },
    // Language
    language: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
  ar: {
    // Header
    nav: {
      origins: "أصولنا",
      boutique: "المتجر",
      mastery: "خبرتنا",
      contact: "اتصل بنا",
    },
    // Hero
    hero: {
      tagline: "دقة في كل كوب. تراث في كل رشفة.",
      description: "اكتشف قمة إتقان القهوة. حبوب مختارة بعناية، تحميص حرفي، تجربة لا مثيل لها.",
      cta: "اكتشف المجموعة",
    },
    // Boutique
    boutique: {
      title: "المتجر",
      origin: "المصدر",
      roast: "التحميص",
      weight: "الوزن",
      addToCart: "أضف إلى السلة",
      outOfStock: "نفذت الكمية",
      bestseller: "الأكثر مبيعاً",
    },
    // Mastery
    mastery: {
      title: "خبرتنا",
      subtitle: "فن الإتقان",
      description: "كل حبة تروي قصة. من قلب الأراضي الجبلية حيث تُزرع حبوبنا، إلى التحميص الدقيق في مشغلنا، نكرّم التقاليد مع احتضان الابتكار.",
      philosophy: "فلسفتنا بسيطة: الجودة بلا تنازل. نختار فقط أفضل 2% من حبوب الأرابيكا في العالم، محمصة بكميات صغيرة للكشف عن شخصيتها الفريدة.",
      stats: {
        years: "سنوات من التميز",
        countries: "دولة نخدمها",
        blends: "خلطات فريدة",
      },
    },
    // Footer
    footer: {
      newsletter: {
        title: "انضم إلى الدائرة الخاصة",
        description: "وصول حصري إلى المجموعات الجديدة والفعاليات الخاصة والعروض المخصصة للأعضاء.",
        placeholder: "بريدك الإلكتروني",
        button: "اشترك",
        success: "مرحباً بك في الدائرة!",
      },
      links: {
        boutique: "المتجر",
        about: "قصتنا",
        contact: "اتصل بنا",
        shipping: "الشحن",
        returns: "الإرجاع",
        faq: "الأسئلة الشائعة",
        terms: "الشروط",
        privacy: "الخصوصية",
      },
      copyright: "جميع الحقوق محفوظة.",
    },
    // Cart
    cart: {
      title: "سلة التسوق",
      empty: "سلتك فارغة",
      emptyDescription: "اكتشف مجموعتنا من القهوة الاستثنائية",
      continueShopping: "متابعة التسوق",
      subtotal: "المجموع الفرعي",
      shipping: "الشحن",
      shippingNote: "يُحسب عند الطلب",
      total: "المجموع",
      checkout: "اطلب عبر واتساب",
      remove: "إزالة",
    },
    // Checkout Form
    checkout: {
      title: "إتمام الطلب",
      subtitle: "الدفع عند الاستلام",
      name: "الاسم الكامل",
      namePlaceholder: "اسمك",
      phone: "الهاتف",
      phonePlaceholder: "+212 6XX XXX XXX",
      address: "العنوان",
      addressPlaceholder: "عنوانك الكامل",
      city: "المدينة",
      cityPlaceholder: "مدينتك",
      notes: "ملاحظات (اختياري)",
      notesPlaceholder: "تعليمات التوصيل...",
      submit: "تأكيد وإرسال عبر واتساب",
      back: "العودة إلى السلة",
      orderSummary: "ملخص الطلب",
      items: "منتجات",
    },
    // WhatsApp Message
    whatsapp: {
      greeting: "مرحباً! أود تقديم طلب:",
      orderDetails: "تفاصيل الطلب",
      customerInfo: "معلومات العميل",
      name: "الاسم",
      phone: "الهاتف",
      address: "العنوان",
      city: "المدينة",
      notes: "ملاحظات",
      total: "المجموع",
      paymentMethod: "الدفع عند الاستلام",
    },
    // Origins Journey
    origins: {
      title: "رحلتنا",
      subtitle: "أربعة أصول استثنائية. مزيج فريد.",
      altitude: "الارتفاع",
      notes: "النكهات",
      blendNote: "سر خلطاتنا: التوازن المثالي بين هذه الأصول الأربعة.",
      items: {
        ethiopia: {
          country: "إثيوبيا",
          title: "مهد القهوة",
          description: "حيث بدأ كل شيء. في مرتفعات إثيوبيا، تنمو حبوب الأرابيكا لدينا بنكهات زهرية وفاكهية فريدة، مزروعة وفق تقاليد عمرها آلاف السنين.",
          altitude: "1,500 - 2,200م",
          notes: "زهري، فاكهي، حمضيات",
        },
        colombia: {
          country: "كولومبيا",
          title: "التميز الأنديزي",
          description: "في قلب جبال الأنديز الكولومبية، تنضج حبوب الأرابيكا ببطء تحت ظل أشجار الموز، مطورة حموضة لامعة وقواماً حريرياً لا مثيل له.",
          altitude: "1,200 - 1,800م",
          notes: "كراميل، بندق، شوكولاتة",
        },
        uganda: {
          country: "أوغندا",
          title: "القوة الأفريقية",
          description: "من جبال روينزوري، تمنحنا حبوب الروبوستا الاستثنائية كثافة عميقة وكريما ناعمة. قوة أفريقيا في كل فنجان.",
          altitude: "1,200 - 1,500م",
          notes: "كثيف، خشبي، كاكاو",
        },
        india: {
          country: "الهند",
          title: "سر مالابار",
          description: "تحت أمطار الرياح الموسمية في غاتس الغربية، تكتسب حبوبنا طابعاً فريداً. رحلة حسية بين التوابل والنعومة الاستوائية.",
          altitude: "1,000 - 1,500م",
          notes: "حار، ترابي، ناعم",
        },
      },
    },
    // Language
    language: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
  en: {
    // Header
    nav: {
      origins: "Our Origins",
      boutique: "The Boutique",
      mastery: "Our Mastery",
      contact: "Contact",
    },
    // Hero
    hero: {
      tagline: "Precision in Every Pour. Heritage in Every Cup.",
      description: "Experience the pinnacle of coffee mastery. Carefully selected beans, artisanal roasting, an unparalleled experience.",
      cta: "Discover the Collection",
    },
    // Boutique
    boutique: {
      title: "The Boutique",
      origin: "Origin",
      roast: "Roast",
      weight: "Weight",
      addToCart: "Add to Cart",
      outOfStock: "Out of Stock",
      bestseller: "Bestseller",
    },
    // Mastery
    mastery: {
      title: "Our Mastery",
      subtitle: "The Art of Perfection",
      description: "Every bean tells a story. From the heart of mountainous lands where our beans are grown, to the meticulous roasting in our workshop, we honor tradition while embracing innovation.",
      philosophy: "Our philosophy is simple: uncompromising quality. We select only the top 2% of arabica beans worldwide, roasted in small batches to reveal their unique character.",
      stats: {
        years: "Years of Excellence",
        countries: "Countries Served",
        blends: "Unique Blends",
      },
    },
    // Footer
    footer: {
      newsletter: {
        title: "Join the Private Circle",
        description: "Exclusive access to new collections, private events, and member-only offers.",
        placeholder: "Your email address",
        button: "Subscribe",
        success: "Welcome to the circle!",
      },
      links: {
        boutique: "The Boutique",
        about: "Our Story",
        contact: "Contact",
        shipping: "Shipping",
        returns: "Returns",
        faq: "FAQ",
        terms: "Terms",
        privacy: "Privacy",
      },
      copyright: "All rights reserved.",
    },
    // Cart
    cart: {
      title: "Your Cart",
      empty: "Your cart is empty",
      emptyDescription: "Discover our exceptional coffee collection",
      continueShopping: "Continue Shopping",
      subtotal: "Subtotal",
      shipping: "Shipping",
      shippingNote: "Calculated at checkout",
      total: "Total",
      checkout: "Order via WhatsApp",
      remove: "Remove",
    },
    // Checkout Form
    checkout: {
      title: "Complete Your Order",
      subtitle: "Cash on Delivery (COD)",
      name: "Full Name",
      namePlaceholder: "Your name",
      phone: "Phone",
      phonePlaceholder: "+212 6XX XXX XXX",
      address: "Address",
      addressPlaceholder: "Your full address",
      city: "City",
      cityPlaceholder: "Your city",
      notes: "Notes (optional)",
      notesPlaceholder: "Delivery instructions...",
      submit: "Confirm & Send via WhatsApp",
      back: "Back to cart",
      orderSummary: "Order Summary",
      items: "items",
    },
    // WhatsApp Message
    whatsapp: {
      greeting: "Hello! I would like to place an order:",
      orderDetails: "Order Details",
      customerInfo: "Customer Information",
      name: "Name",
      phone: "Phone",
      address: "Address",
      city: "City",
      notes: "Notes",
      total: "Total",
      paymentMethod: "Cash on Delivery",
    },
    // Origins Journey
    origins: {
      title: "Our Journey",
      subtitle: "Four exceptional terroirs. One unique blend.",
      altitude: "Altitude",
      notes: "Notes",
      blendNote: "The secret of our blends: the perfect balance between these four terroirs.",
      items: {
        ethiopia: {
          country: "Ethiopia",
          title: "The Birthplace of Coffee",
          description: "Where it all began. In the Ethiopian highlands, our heirloom Arabica beans develop unique floral and fruity notes, cultivated according to millennia-old traditions.",
          altitude: "1,500 - 2,200m",
          notes: "Floral, Fruity, Citrus",
        },
        colombia: {
          country: "Colombia",
          title: "Andean Excellence",
          description: "In the heart of the Colombian Andes, our Arabica beans ripen slowly under the shade of banana trees, developing a brilliant acidity and incomparable silky body.",
          altitude: "1,200 - 1,800m",
          notes: "Caramel, Hazelnut, Chocolate",
        },
        uganda: {
          country: "Uganda",
          title: "African Strength",
          description: "From the Rwenzori Mountains, our exceptional Robusta brings deep intensity and velvety crema. The power of Africa in every cup.",
          altitude: "1,200 - 1,500m",
          notes: "Intense, Woody, Cocoa",
        },
        india: {
          country: "India",
          title: "The Malabar Mystery",
          description: "Under the monsoon rains of the Western Ghats, our beans develop a unique character. A sensory journey between spices and tropical sweetness.",
          altitude: "1,000 - 1,500m",
          notes: "Spicy, Earthy, Smooth",
        },
      },
    },
    // Language
    language: {
      fr: "Français",
      ar: "العربية",
      en: "English",
    },
  },
}

export type Translations = typeof translations.fr
