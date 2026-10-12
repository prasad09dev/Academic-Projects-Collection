import React, { useState } from "react";
import Cards from "../Components/Cards";
import productsData from "../Components/Data/ProductsData";

function Products() {
    // FILTER STATES
    const [maxPrice, setMaxPrice] = useState(19990);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState("Latest");

    // MOBILE FILTER
    const [showFilters, setShowFilters] = useState(false);

    // BRAND FILTER
    const handleBrandChange = (brand) => {setSelectedBrands((prev) => {
            if (prev.includes(brand)) {
                return prev.filter((item) => item !== brand);
            }
            return [...prev, brand];
        });
    };

    // CATEGORY FILTER
    const handleCategoryChange = (category) => {setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((item) => item !== category);
            }
            return [...prev, category];
        });
    };

    // CLEAR FILTERS
    const clearFilters = () => {setSelectedBrands([]); setSelectedCategories([]); setMaxPrice(19990); setSortBy("Latest");};

    // FILTER PRODUCTS
    let filteredProducts = productsData.filter((product) => {
        const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.finalPrice <= maxPrice;
        return brandMatch && categoryMatch && priceMatch;
    });

    // SORT PRODUCTS
    if (sortBy === "Price(Lowest First)") {
        filteredProducts.sort((a, b) => a.finalPrice - b.finalPrice);
    }

    if (sortBy === "Price(Highest First)") {
        filteredProducts.sort((a, b) => b.finalPrice - a.finalPrice);
    }

    if (sortBy === "Top Rated") {
        filteredProducts.sort((a, b) => b.rateCount - a.rateCount);
    }

    if (sortBy === "Featured") {
        filteredProducts = filteredProducts.filter((product) => product.tag === "featured-product");
    }

    const isFilterActive = selectedBrands.length > 0 || selectedCategories.length > 0 || maxPrice < 19990 || sortBy !== "Latest";


    return (
        <div className="min-h-screen">

            {/* MOBILE FILTER BUTTON */}
            <div className="md:hidden px-[15px] pt-[20px]">
                <button onClick={() => setShowFilters(!showFilters)} className=" w-full py-[12px] rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white active:scale-95 transition duration-200 cursor-pointer">
                    {showFilters ? "Hide Filters" : "Filters & Sort"}
                </button>
            </div>


            <div className="flex">
                {/* FILTER SIDEBAR */}
                <aside className={` w-full md:w-[220px] md:min-w-[220px] p-[20px] md:sticky md:top-[20px] md:self-start md:max-h-[calc(100vh-20px)] md:overflow-y-auto ${showFilters ? "block" : "hidden md:block"}`}>
                    {/* SORT BY */}
                    <h2 className="text-2xl font-semibold mb-[15px]">Sort By</h2>

                    {/* CLEAR FILTERS */}
                    {isFilterActive && (
                        <button onClick={clearFilters} className=" w-full py-[10px] mb-[15px] rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white active:scale-95 transition duration-200 cursor-pointer">
                            Clear Filters
                        </button>
                    )}

                    <div className="border-t border-gray-700 pt-[15px]">
                        {/* Latest */}
                        <div onClick={() => setSortBy("Latest")} className={` cursor-pointer mb-[15px] transition
                                ${
                                    sortBy === "Latest"
                                        ? "text-orange-500"
                                        : "hover:text-orange-500"}`}>Latest</div>

                        {/* Featured */}
                        <div onClick={() => setSortBy("Featured")} className={` cursor-pointer mb-[15px] transition
                                ${
                                    sortBy === "Featured"
                                        ? "text-orange-500"
                                        : "hover:text-orange-500"}`}>Featured</div>

                        {/* Top Rated */}
                        <div onClick={() => setSortBy("Top Rated")} className={` cursor-pointer mb-[15px] transition
                                ${
                                    sortBy === "Top Rated"
                                        ? "text-orange-500"
                                        : "hover:text-orange-500"}`}>Top Rated</div>

                        {/* Lowest Price */}
                        <div onClick={() => setSortBy("Price(Lowest First)")} className={` cursor-pointer mb-[15px] transition
                                ${
                                    sortBy === "Price(Lowest First)"
                                        ? "text-orange-500"
                                        : "hover:text-orange-500"}`}>Price (Lowest First)</div>

                        {/* Highest Price */}
                        <div onClick={() => setSortBy("Price(Highest First)")} className={` cursor-pointer transition
                                ${
                                    sortBy === "Price(Highest First)"
                                        ? "text-orange-500"
                                        : "hover:text-orange-500"}`}>Price (Highest First)</div>
                    </div>


                    {/* FILTER BY */}
                    <h2 className=" text-2xl font-semibold mt-[40px] mb-[15px]">Filter By</h2>
                    <div className=" border-t border-gray-700 pt-[20px]">

                        {/* BRANDS */}
                        <h3 className="text-lg font-semibold mb-[15px]">
                            Brands
                        </h3>

                        <div className="flex flex-col gap-[10px]">

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes("JBL")}
                                    onChange={() =>
                                        handleBrandChange("JBL")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                JBL
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes("boAt")}
                                    onChange={() =>
                                        handleBrandChange("boAt")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                boAt
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes("Sony")}
                                    onChange={() =>
                                        handleBrandChange("Sony")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                Sony
                            </label>

                        </div>


                        {/* CATEGORY */}
                        <h3 className="
                            text-lg
                            font-semibold
                            mt-[40px]
                            mb-[15px]
                        ">
                            Category
                        </h3>

                        <div className="flex flex-col gap-[10px]">

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        "Headphones"
                                    )}
                                    onChange={() =>
                                        handleCategoryChange("Headphones")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                Headphones
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        "Earbuds"
                                    )}
                                    onChange={() =>
                                        handleCategoryChange("Earbuds")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                Earbuds
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        "Earphones"
                                    )}
                                    onChange={() =>
                                        handleCategoryChange("Earphones")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                Earphones
                            </label>

                            <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(
                                        "Neckbands"
                                    )}
                                    onChange={() =>
                                        handleCategoryChange("Neckbands")
                                    }
                                    className="
                                        mr-[12px]
                                        accent-orange-500
                                    "
                                />
                                Neckbands
                            </label>

                        </div>


                        {/* PRICE */}
                        <div className="
                            mt-[40px]
                            mb-[30px]
                        ">
                            <h3 className="
                                text-lg
                                font-semibold
                                mb-[15px]
                            ">
                                Price
                            </h3>

                            <p className="
                                text-[17px]
                                mb-[15px]
                            ">
                                ₹{maxPrice.toLocaleString("en-IN")}
                            </p>

                            <input
                                type="range"
                                min="0"
                                max="19990"
                                value={maxPrice}
                                onChange={(e) =>
                                    setMaxPrice(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                                    w-full
                                    accent-orange-500
                                    cursor-pointer
                                "
                            />
                        </div>

                    </div>

                    {/* MOBILE APPLY BUTTON */}
                    <button
                        onClick={() => setShowFilters(false)}
                        className="
                            md:hidden
                            w-full
                            py-[12px]
                            bg-orange-500
                            hover:bg-orange-600
                            active:scale-95
                            text-white
                            rounded-md
                            transition
                            cursor-pointer
                        "
                    >
                        Apply Filters
                    </button>

                </aside>


                {/* PRODUCTS */}
                <main className="
                    flex-1
                    px-[15px]
                    sm:px-[20px]
                    py-[30px]
                ">

                    {/* RESULT COUNT */}
                    <div className="mb-[20px] text-gray-500">
                        {filteredProducts.length} Products
                    </div>

                    {filteredProducts.length > 0 ? (

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            md:grid-cols-3
                            lg:grid-cols-4
                            gap-[20px]
                            items-start
                        ">
                            {filteredProducts.map((product) => (
                                <Cards
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>

                    ) : (

                        /* NO PRODUCTS */
                        <div className="
                            min-h-[300px]
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        ">
                            <h2 className="text-2xl font-semibold">
                                No Products Found
                            </h2>

                            <p className="text-gray-500 mt-[10px]">
                                Try changing your filters.
                            </p>

                            <button
                                onClick={clearFilters}
                                className="
                                    mt-[20px]
                                    px-[25px]
                                    py-[10px]
                                    rounded-md
                                    bg-orange-500
                                    hover:bg-orange-600
                                    active:scale-95
                                    text-white
                                    transition
                                    cursor-pointer
                                "
                            >
                                Clear Filters
                            </button>
                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default Products;