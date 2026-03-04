import { ListFilter, Pencil, SlidersHorizontal, Trash2 } from "lucide-react";


const Products = () => {
  const products = [
    {
      id: 1,
      name: "Erkaklar paxtali futbolkasi, Premium-Sifat",
      sku: "MB-TSH-001",
      price: "15,000 - 20,000 UZS",
      moq: "50 dona",
      views: "1.2k ko'rilgan",
      status: "FAOL",
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/ce1e3277ba4641b9b62eb3a072fd031e_9366/Y-3_Relaxed_Short_Sleeve_Tee_White_IV8221_01_laydown.jpg",
      active: true,
    },
    {
      id: 2,
      name: "Ayollar shoyi ko'ylagi (Bahorgi kollektsiya)",
      sku: "MB-DRS-042",
      price: null,
      moq: "-",
      views: "2 soat oldin yangilangan",
      status: "QORALAMA",
      image:
        "https://www.santaeulalia.com/cdn/shop/files/553-004519-01_01.jpg?v=1752491701",
      active: false,
      draft: true,
    },
    {
      id: 3,
      name: "Klassik charm poyabzal, Jigarrang",
      sku: "MB-SHOE-11",
      price: "120,000 - 150,000 UZS",
      moq: "12 juft",
      views: "842 ko'rilgan",
      status: "FAOL",
      image:
        "https://cdn-images.farfetch-contents.com/27/80/37/47/27803747_57581041_1000.jpg",
      active: true,
    },
    {
      id: 4,
      name: "Sport kiyimi to'plami, Mikrofibra",
      sku: "MB-SPRT-05",
      price: "85,000 - 95,000 UZS",
      moq: "30 to'plam",
      views: "2.1k ko'rilgan",
      status: "FAOL",
      image:
        "https://cdn-images.farfetch-contents.com/27/80/37/47/27803747_57581041_1000.jpg",
      active: true,
    },
  ];

  return (
    <div className=" mx-auto md:p-4 p-2 bg-gray-50 min-full font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex gap-8 border-b border-gray-200 w-full md:w-auto">
          <button className="pb-3 border-b-2 border-orange-500 text-orange-600 font-medium">Barchasi (24)</button>
          <button className="pb-3 text-gray-500 hover:text-gray-700">Faol (18)</button>
          <button className="pb-3 text-gray-500 hover:text-gray-700">Qoralama (6)</button>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <ListFilter className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            <span className="text-sm">Saralash</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >

            <div className="w-30 h-30 rounded-md overflow-hidden shrink-0 flex items-center justify-center  border border-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
            </div>


            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${product.active ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                      }`}
                  >
                    {product.draft ? "DRAFT" : product.status}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">SKU: {product.sku}</span>
                </div>
              </div>

              <h3 className="text-gray-800 font-semibold text-base mb-1 truncate">
                {product.name}
              </h3>

              <p className={`font-bold mb-2 ${product.price ? "text-orange-500 text-lg" : "text-gray-400 text-sm"}`}>
                {product.price ?? "Narx belgilanmagan"}
              </p>

              <div className="flex items-center gap-4 text-[13px] text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="text-gray-400">📦</span>
                  <span className="text-sm text-gray-500">MOQ: {product.moq}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-gray-400">👁️</span>
                  <span className="text-sm text-gray-500">{product.views}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 ml-2">
              <button className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors">
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-white border border-gray-100 rounded-md flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50">
          Yana yuklash
        </button>
      </div>
    </div>
  );
}


export default Products