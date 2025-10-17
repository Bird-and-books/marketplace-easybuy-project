'use client';
import React, { useReducer, useMemo, useState } from 'react';

/**
 * DropdownBtn – адаптивне меню каталогу
 * - 📱 Mobile: покроковий drawer (root → lvl2 → lvl3) з Back/Close
 * - 💻 Desktop: hover випадачка у 3 колонки
 * - TailwindCSS
 */

/* =========================
 * Helpers: slug + tree build
 * ========================= */
const slugify = (s) =>
    s
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '') // strip diacritics
        .replace(/&/g, 'and')
        .replace(/['’`]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

/** @typedef {{ id: string; name: string; children?: Node[] }} Node */

/** @param {Node[]} arr @param {string} name */
function upsert(arr, name) {
    const id = slugify(name);
    let node = arr.find((n) => n.id === id);
    if (!node) {
        node = { id, name, children: [] };
        arr.push(node);
    }
    if (!node.children) node.children = [];
    return node;
}

/** @param {Array<[string,string,string]>} tuples */
function buildTreeFromTuples(tuples) {
    const root = /** @type {Node[]} */ ([]);
    for (const [l1, l2, l3] of tuples) {
        const n1 = upsert(root, l1);
        const n2 = upsert(n1.children, l2);
        const leafId = slugify(l3);
        if (!n2.children.some((c) => c.id === leafId)) {
            n2.children.push({ id: leafId, name: l3 });
        }
    }
    return root;
}

/* =========================
 * L1/L2/L3 tuples (повний список)
 * ========================= */
const tuples = [
    ["Women's clothing","Outerwear","Coats"],
    ["Women's clothing","Outerwear","Jackets"],
    ["Women's clothing","Outerwear","Parkas"],
    ["Women's clothing","Outerwear","Down jackets"],
    ["Women's clothing","Outerwear","Vests"],
    ["Women's clothing","Outerwear","Raincoats"],
    ["Women's clothing","Outerwear","Trench coats"],
    ["Women's clothing","Outerwear","Leather jackets"],
    ["Women's clothing","Outerwear","Faux fur"],
    ["Women's clothing","Outerwear","Capes & ponchos"],
    ["Women's clothing","Knitwear","Sweaters"],
    ["Women's clothing","Knitwear","Cardigans"],
    ["Women's clothing","Knitwear","Turtlenecks"],
    ["Women's clothing","Knitwear","Vests"],
    ["Women's clothing","Tops","T-shirts"],
    ["Women's clothing","Tops","Longsleeves"],
    ["Women's clothing","Tops","Blouses"],
    ["Women's clothing","Tops","Shirts"],
    ["Women's clothing","Tops","Tank tops"],
    ["Women's clothing","Tops","Bodysuits"],
    ["Women's clothing","Tops","Hoodies"],
    ["Women's clothing","Tops","Sweatshirts"],
    ["Women's clothing","Dresses","Casual"],
    ["Women's clothing","Dresses","Office"],
    ["Women's clothing","Dresses","Evening"],
    ["Women's clothing","Dresses","Cocktail"],
    ["Women's clothing","Dresses","Summer"],
    ["Women's clothing","Dresses","Knitted"],
    ["Women's clothing","Dresses","Shirt dresses"],
    ["Women's clothing","Dresses","Maxi"],
    ["Women's clothing","Dresses","Midi"],
    ["Women's clothing","Dresses","Mini"],
    ["Women's clothing","Dresses","Maternity"],
    ["Women's clothing","Dresses","Plus size"],
    ["Women's clothing","Skirts","Pencil"],
    ["Women's clothing","Skirts","A-line"],
    ["Women's clothing","Skirts","Pleated"],
    ["Women's clothing","Skirts","Wrap"],
    ["Women's clothing","Skirts","Mini"],
    ["Women's clothing","Skirts","Midi"],
    ["Women's clothing","Skirts","Maxi"],
    ["Women's clothing","Skirts","Leather"],
    ["Women's clothing","Pants","Jeans – skinny"],
    ["Women's clothing","Pants","Jeans – straight"],
    ["Women's clothing","Pants","Jeans – mom"],
    ["Women's clothing","Pants","Chinos"],
    ["Women's clothing","Pants","Trousers"],
    ["Women's clothing","Pants","Leggings"],
    ["Women's clothing","Pants","Joggers"],
    ["Women's clothing","Pants","Culottes"],
    ["Women's clothing","Pants","Shorts"],
    ["Women's clothing","Suits","Trouser suits"],
    ["Women's clothing","Suits","Skirt suits"],
    ["Women's clothing","Suits","Blazers"],
    ["Women's clothing","Suits","Vests"],
    ["Women's clothing","Underwear","Bras"],
    ["Women's clothing","Underwear","Panties"],
    ["Women's clothing","Underwear","Sets"],
    ["Women's clothing","Underwear","Shapewear"],
    ["Women's clothing","Underwear","Thermal underwear"],
    ["Women's clothing","Underwear","Socks & tights"],
    ["Women's clothing","Sleepwear & Home","Pajamas"],
    ["Women's clothing","Sleepwear & Home","Nightgowns"],
    ["Women's clothing","Sleepwear & Home","Robes"],
    ["Women's clothing","Sleepwear & Home","Loungewear"],
    ["Women's clothing","Sleepwear & Home","Slippers"],
    ["Women's clothing","Sportswear","Tracksuits"],
    ["Women's clothing","Sportswear","Leggings"],
    ["Women's clothing","Sportswear","Sport bras"],
    ["Women's clothing","Sportswear","Tops"],
    ["Women's clothing","Sportswear","Outerwear"],
    ["Women's clothing","Swimwear","One-piece"],
    ["Women's clothing","Swimwear","Bikinis"],
    ["Women's clothing","Swimwear","Tankinis"],
    ["Women's clothing","Swimwear","Cover-ups"],
    ["Women's clothing","Swimwear","Beachwear"],
    ["Women's clothing","Shoes","Sneakers"],
    ["Women's clothing","Shoes","Boots"],
    ["Women's clothing","Shoes","Ankle boots"],
    ["Women's clothing","Shoes","Heels"],
    ["Women's clothing","Shoes","Flats"],
    ["Women's clothing","Shoes","Sandals"],
    ["Women's clothing","Shoes","Loafers"],
    ["Women's clothing","Shoes","Mules"],
    ["Women's clothing","Shoes","Espadrilles"],
    ["Women's clothing","Shoes","Slippers"],
    ["Women's clothing","Accessories","Bags – tote"],
    ["Women's clothing","Accessories","Bags – crossbody"],
    ["Women's clothing","Accessories","Backpacks"],
    ["Women's clothing","Accessories","Wallets"],
    ["Women's clothing","Accessories","Belts"],
    ["Women's clothing","Accessories","Hats & caps"],
    ["Women's clothing","Accessories","Scarves"],
    ["Women's clothing","Accessories","Gloves"],
    ["Women's clothing","Accessories","Jewelry"],
    ["Women's clothing","Accessories","Sunglasses"],
    ["Women's clothing","Accessories","Umbrellas"],
    ["Women's clothing","Special","For pregnancy"],
    ["Women's clothing","Special","Plus size"],
    ["Women's clothing","Special","Workwear"],
    ["Women's clothing","Special","Uniforms"],

    ["Men's clothing","Outerwear","Coats"],
    ["Men's clothing","Outerwear","Jackets"],
    ["Men's clothing","Outerwear","Parkas"],
    ["Men's clothing","Outerwear","Down jackets"],
    ["Men's clothing","Outerwear","Vests"],
    ["Men's clothing","Outerwear","Raincoats"],
    ["Men's clothing","Outerwear","Leather jackets"],
    ["Men's clothing","Outerwear","Blazers"],
    ["Men's clothing","Knitwear","Sweaters"],
    ["Men's clothing","Knitwear","Cardigans"],
    ["Men's clothing","Knitwear","Turtlenecks"],
    ["Men's clothing","Knitwear","Vests"],
    ["Men's clothing","Tops","T-shirts"],
    ["Men's clothing","Tops","Polos"],
    ["Men's clothing","Tops","Shirts – casual"],
    ["Men's clothing","Tops","Shirts – formal"],
    ["Men's clothing","Tops","Hoodies"],
    ["Men's clothing","Tops","Sweatshirts"],
    ["Men's clothing","Pants","Jeans – slim"],
    ["Men's clothing","Pants","Jeans – straight"],
    ["Men's clothing","Pants","Chinos"],
    ["Men's clothing","Pants","Trousers – classic"],
    ["Men's clothing","Pants","Joggers"],
    ["Men's clothing","Pants","Shorts"],
    ["Men's clothing","Suits","Two-piece suits"],
    ["Men's clothing","Suits","Three-piece suits"],
    ["Men's clothing","Suits","Blazers"],
    ["Men's clothing","Suits","Vests"],
    ["Men's clothing","Underwear","Boxers"],
    ["Men's clothing","Underwear","Briefs"],
    ["Men's clothing","Underwear","Socks"],
    ["Men's clothing","Underwear","Thermal underwear"],
    ["Men's clothing","Sleepwear & Home","Pajamas"],
    ["Men's clothing","Sleepwear & Home","Robes"],
    ["Men's clothing","Sleepwear & Home","Loungewear"],
    ["Men's clothing","Sleepwear & Home","Slippers"],
    ["Men's clothing","Sportswear","Tracksuits"],
    ["Men's clothing","Sportswear","Compression"],
    ["Men's clothing","Sportswear","Outerwear"],
    ["Men's clothing","Sportswear","Tops"],
    ["Men's clothing","Sportswear","Bottoms"],
    ["Men's clothing","Shoes","Sneakers"],
    ["Men's clothing","Shoes","Derbies"],
    ["Men's clothing","Shoes","Oxfords"],
    ["Men's clothing","Shoes","Loafers"],
    ["Men's clothing","Shoes","Boots"],
    ["Men's clothing","Shoes","Sandals"],
    ["Men's clothing","Shoes","Slippers"],
    ["Men's clothing","Accessories","Bags & backpacks"],
    ["Men's clothing","Accessories","Wallets"],
    ["Men's clothing","Accessories","Belts"],
    ["Men's clothing","Accessories","Hats & caps"],
    ["Men's clothing","Accessories","Scarves"],
    ["Men's clothing","Accessories","Gloves"],
    ["Men's clothing","Accessories","Ties & bow ties"],
    ["Men's clothing","Accessories","Watches"],
    ["Men's clothing","Accessories","Sunglasses"],
    ["Men's clothing","Special","Plus size"],
    ["Men's clothing","Special","Workwear"],
    ["Men's clothing","Special","Uniforms"],

    ["Children's clothing","By age","Baby 0-24m"],
    ["Children's clothing","By age","Kids 2-8y"],
    ["Children's clothing","By age","Teens 9-16y"],
    ["Children's clothing","Outerwear","Coats & jackets"],
    ["Children's clothing","Outerwear","Down jackets"],
    ["Children's clothing","Outerwear","Vests"],
    ["Children's clothing","Outerwear","Rainwear"],
    ["Children's clothing","Tops","T-shirts"],
    ["Children's clothing","Tops","Shirts & blouses"],
    ["Children's clothing","Tops","Hoodies"],
    ["Children's clothing","Tops","Sweatshirts"],
    ["Children's clothing","Bottoms","Jeans"],
    ["Children's clothing","Bottoms","Trousers"],
    ["Children's clothing","Bottoms","Leggings"],
    ["Children's clothing","Bottoms","Shorts"],
    ["Children's clothing","Bottoms","Skirts (girls)"],
    ["Children's clothing","Dresses (girls)","Casual"],
    ["Children's clothing","Dresses (girls)","Occasion"],
    ["Children's clothing","Dresses (girls)","School"],
    ["Children's clothing","School","Uniforms"],
    ["Children's clothing","School","Sports kit"],
    ["Children's clothing","School","Backpacks"],
    ["Children's clothing","Shoes","Sneakers"],
    ["Children's clothing","Shoes","Boots"],
    ["Children's clothing","Shoes","Sandals"],
    ["Children's clothing","Shoes","School shoes"],
    ["Children's clothing","Shoes","Slippers"],
    ["Children's clothing","Accessories","Hats & scarves"],
    ["Children's clothing","Accessories","Gloves"],
    ["Children's clothing","Accessories","Belts"],
    ["Children's clothing","Accessories","Hair accessories"],

    ["Accessories (unisex)","Bags","Tote"],
    ["Accessories (unisex)","Bags","Crossbody"],
    ["Accessories (unisex)","Bags","Shoulder"],
    ["Accessories (unisex)","Bags","Backpacks"],
    ["Accessories (unisex)","Bags","Suitcases"],
    ["Accessories (unisex)","Bags","Wallets"],
    ["Accessories (unisex)","Jewelry","Necklaces"],
    ["Accessories (unisex)","Jewelry","Bracelets"],
    ["Accessories (unisex)","Jewelry","Earrings"],
    ["Accessories (unisex)","Jewelry","Rings"],
    ["Accessories (unisex)","Jewelry","Watches"],
    ["Accessories (unisex)","Headwear","Caps"],
    ["Accessories (unisex)","Headwear","Hats"],
    ["Accessories (unisex)","Headwear","Beanies"],
    ["Accessories (unisex)","Winter","Scarves"],
    ["Accessories (unisex)","Winter","Gloves"],
    ["Accessories (unisex)","Winter","Mittens"],
    ["Accessories (unisex)","Eyewear","Sunglasses"],
    ["Accessories (unisex)","Eyewear","Frames"],
    ["Accessories (unisex)","Belts & small goods","Belts"],
    ["Accessories (unisex)","Belts & small goods","Keychains"],
    ["Accessories (unisex)","Belts & small goods","Cardholders"],
    ["Accessories (unisex)","Belts & small goods","Umbrellas"],

    ["Technology & electronics","Phones","Smartphones"],
    ["Technology & electronics","Phones","Feature phones"],
    ["Technology & electronics","Phones","Accessories – cases"],
    ["Technology & electronics","Phones","Accessories – chargers"],
    ["Technology & electronics","Phones","Cables & adapters"],
    ["Technology & electronics","Phones","Power banks"],
    ["Technology & electronics","Phones","Screen protectors"],
    ["Technology & electronics","Computers","Laptops"],
    ["Technology & electronics","Computers","Desktops"],
    ["Technology & electronics","Computers","Monitors"],
    ["Technology & electronics","Computers","Tablets"],
    ["Technology & electronics","Computers","Keyboards"],
    ["Technology & electronics","Computers","Mice"],
    ["Technology & electronics","Computers","Printers & scanners"],
    ["Technology & electronics","Components","CPU"],
    ["Technology & electronics","Components","GPU"],
    ["Technology & electronics","Components","Motherboards"],
    ["Technology & electronics","Components","RAM"],
    ["Technology & electronics","Components","Storage – SSD/HDD"],
    ["Technology & electronics","Components","PSU"],
    ["Technology & electronics","Components","Cases"],
    ["Technology & electronics","Components","Cooling"],
    ["Technology & electronics","Audio & video","Headphones"],
    ["Technology & electronics","Audio & video","Portable speakers"],
    ["Technology & electronics","Audio & video","Soundbars"],
    ["Technology & electronics","Audio & video","Hi-Fi"],
    ["Technology & electronics","Audio & video","TVs"],
    ["Technology & electronics","Audio & video","Projectors"],
    ["Technology & electronics","Audio & video","Streaming devices"],
    ["Technology & electronics","Gaming","Consoles"],
    ["Technology & electronics","Gaming","Games"],
    ["Technology & electronics","Gaming","Controllers"],
    ["Technology & electronics","Gaming","VR headsets"],
    ["Technology & electronics","Cameras & photo","DSLR"],
    ["Technology & electronics","Cameras & photo","Mirrorless"],
    ["Technology & electronics","Cameras & photo","Lenses"],
    ["Technology & electronics","Cameras & photo","Action cams"],
    ["Technology & electronics","Cameras & photo","Drones"],
    ["Technology & electronics","Cameras & photo","Tripods"],
    ["Technology & electronics","Networking","Routers"],
    ["Technology & electronics","Networking","Mesh systems"],
    ["Technology & electronics","Networking","Range extenders"],
    ["Technology & electronics","Wearables","Smartwatches"],
    ["Technology & electronics","Wearables","Fitness trackers"],
    ["Technology & electronics","Wearables","Accessories"],
    ["Technology & electronics","Smart home","Lights"],
    ["Technology & electronics","Smart home","Plugs"],
    ["Technology & electronics","Smart home","Thermostats"],
    ["Technology & electronics","Smart home","Sensors"],
    ["Technology & electronics","Smart home","Hubs"],

    ["Home","Furniture","Living room"],
    ["Home","Furniture","Bedroom"],
    ["Home","Furniture","Kitchen & dining"],
    ["Home","Furniture","Bathroom"],
    ["Home","Furniture","Office"],
    ["Home","Furniture","Kids room"],
    ["Home","Furniture","Outdoor"],
    ["Home","Bedding & textiles","Bed linen"],
    ["Home","Bedding & textiles","Blankets"],
    ["Home","Bedding & textiles","Pillows"],
    ["Home","Bedding & textiles","Mattress toppers"],
    ["Home","Bedding & textiles","Curtains"],
    ["Home","Bedding & textiles","Rugs"],
    ["Home","Décor","Wall art"],
    ["Home","Décor","Vases"],
    ["Home","Décor","Candles & aromas"],
    ["Home","Décor","Photo frames"],
    ["Home","Décor","Mirrors"],
    ["Home","Lighting","Ceiling"],
    ["Home","Lighting","Floor"],
    ["Home","Lighting","Table"],
    ["Home","Lighting","Outdoor"],
    ["Home","Lighting","Smart lighting"],
    ["Home","Kitchenware","Cookware"],
    ["Home","Kitchenware","Tableware"],
    ["Home","Kitchenware","Knives"],
    ["Home","Kitchenware","Storage"],
    ["Home","Small appliances","Coffee makers"],
    ["Home","Small appliances","Kettles"],
    ["Home","Small appliances","Toasters"],
    ["Home","Small appliances","Microwaves"],
    ["Home","Small appliances","Blenders"],
    ["Home","Cleaning & storage","Vacuum & mops"],
    ["Home","Cleaning & storage","Laundry baskets"],
    ["Home","Cleaning & storage","Boxes & organizers"],
    ["Home","DIY & tools","Hand tools"],
    ["Home","DIY & tools","Power tools"],
    ["Home","DIY & tools","Fasteners"],
    ["Home","DIY & tools","Paint & supplies"],
    ["Home","Garden","Planters"],
    ["Home","Garden","Garden tools"],
    ["Home","Garden","BBQ & grills"],
    ["Home","Garden","Outdoor furniture"],

    ["Beauty & health","Makeup","Face"],
    ["Beauty & health","Makeup","Eyes"],
    ["Beauty & health","Makeup","Lips"],
    ["Beauty & health","Makeup","Nails"],
    ["Beauty & health","Makeup","Tools & brushes"],
    ["Beauty & health","Skincare","Cleansers"],
    ["Beauty & health","Skincare","Toners"],
    ["Beauty & health","Skincare","Serums"],
    ["Beauty & health","Skincare","Moisturizers"],
    ["Beauty & health","Skincare","Masks"],
    ["Beauty & health","Skincare","Sun care"],
    ["Beauty & health","Haircare","Shampoo"],
    ["Beauty & health","Haircare","Conditioner"],
    ["Beauty & health","Haircare","Treatments"],
    ["Beauty & health","Haircare","Styling"],
    ["Beauty & health","Haircare","Color"],
    ["Beauty & health","Fragrance","Women"],
    ["Beauty & health","Fragrance","Men"],
    ["Beauty & health","Fragrance","Unisex"],
    ["Beauty & health","Bath & body","Shower gels"],
    ["Beauty & health","Bath & body","Scrubs"],
    ["Beauty & health","Bath & body","Lotions"],
    ["Beauty & health","Bath & body","Deodorants"],
    ["Beauty & health","Men grooming","Shaving"],
    ["Beauty & health","Men grooming","Beard care"],
    ["Beauty & health","Men grooming","Aftershave"],
    ["Beauty & health","Personal care devices","Hair dryers"],
    ["Beauty & health","Personal care devices","Straighteners"],
    ["Beauty & health","Personal care devices","Curlers"],
    ["Beauty & health","Personal care devices","Trimmers"],
    ["Beauty & health","Personal care devices","Epilators"],
    ["Beauty & health","Health","Thermometers"],
    ["Beauty & health","Health","Blood pressure monitors"],
    ["Beauty & health","Health","Massagers"],
    ["Beauty & health","Health","First aid"],

    ["Sports & outdoors","Fitness","Treadmills"],
    ["Sports & outdoors","Fitness","Exercise bikes"],
    ["Sports & outdoors","Fitness","Weights"],
    ["Sports & outdoors","Fitness","Kettlebells"],
    ["Sports & outdoors","Fitness","Mats"],
    ["Sports & outdoors","Fitness","Resistance bands"],
    ["Sports & outdoors","Team sports","Football"],
    ["Sports & outdoors","Team sports","Basketball"],
    ["Sports & outdoors","Team sports","Volleyball"],
    ["Sports & outdoors","Team sports","Hockey"],
    ["Sports & outdoors","Running","Shoes"],
    ["Sports & outdoors","Running","Clothing"],
    ["Sports & outdoors","Running","Accessories"],
    ["Sports & outdoors","Cycling","Bikes"],
    ["Sports & outdoors","Cycling","Helmets"],
    ["Sports & outdoors","Cycling","Parts"],
    ["Sports & outdoors","Cycling","Accessories"],
    ["Sports & outdoors","Outdoor","Camping"],
    ["Sports & outdoors","Outdoor","Tents"],
    ["Sports & outdoors","Outdoor","Sleeping bags"],
    ["Sports & outdoors","Outdoor","Backpacks"],
    ["Sports & outdoors","Outdoor","Cookware"],
    ["Sports & outdoors","Water sports","Swimming"],
    ["Sports & outdoors","Water sports","Surfing"],
    ["Sports & outdoors","Water sports","Diving"],
    ["Sports & outdoors","Water sports","SUP"],
    ["Sports & outdoors","Winter sports","Skiing"],
    ["Sports & outdoors","Winter sports","Snowboarding"],
    ["Sports & outdoors","Winter sports","Skating"],
    ["Sports & outdoors","Racket sports","Tennis"],
    ["Sports & outdoors","Racket sports","Badminton"],
    ["Sports & outdoors","Racket sports","Table tennis"],
    ["Sports & outdoors","Racket sports","Squash"],
    ["Sports & outdoors","Yoga & pilates","Mats"],
    ["Sports & outdoors","Yoga & pilates","Blocks"],
    ["Sports & outdoors","Yoga & pilates","Straps"],
    ["Sports & outdoors","Yoga & pilates","Clothing"],
    ["Sports & outdoors","Travel","Suitcases"],
    ["Sports & outdoors","Travel","Travel accessories"],

    ["For pets","Dogs","Dry food"],
    ["For pets","Dogs","Wet food"],
    ["For pets","Dogs","Treats"],
    ["For pets","Dogs","Leashes & collars"],
    ["For pets","Dogs","Beds"],
    ["For pets","Dogs","Toys"],
    ["For pets","Dogs","Hygiene & grooming"],
    ["For pets","Dogs","Clothing"],
    ["For pets","Cats","Dry food"],
    ["For pets","Cats","Wet food"],
    ["For pets","Cats","Treats"],
    ["For pets","Cats","Litter & trays"],
    ["For pets","Cats","Beds"],
    ["For pets","Cats","Toys"],
    ["For pets","Cats","Hygiene & grooming"],
    ["For pets","Cats","Scratchers"],
    ["For pets","Fish & aquariums","Food"],
    ["For pets","Fish & aquariums","Aquariums"],
    ["For pets","Fish & aquariums","Filters"],
    ["For pets","Fish & aquariums","Decor"],
    ["For pets","Birds","Food"],
    ["For pets","Birds","Cages"],
    ["For pets","Birds","Toys"],
    ["For pets","Birds","Care"],
    ["For pets","Small animals","Food"],
    ["For pets","Small animals","Cages"],
    ["For pets","Small animals","Bedding"],
    ["For pets","Small animals","Toys"],

    ["Other","Gifts","Gift sets"],
    ["Other","Gifts","Gift wrap"],
    ["Other","Gifts","Cards"],
    ["Other","Seasonal","Christmas"],
    ["Other","Seasonal","Easter"],
    ["Other","Seasonal","Halloween"],
    ["Other","Seasonal","Back to school"],
    ["Other","Seasonal","Summer"],
    ["Other","Party","Decorations"],
    ["Other","Party","Tableware"],
    ["Other","Party","Costumes"],
    ["Other","Stationery & office","Notebooks"],
    ["Other","Stationery & office","Pens"],
    ["Other","Stationery & office","Paper"],
    ["Other","Stationery & office","Folders"],
    ["Other","Stationery & office","Printers supplies"],
    ["Other","Automotive accessories","Car care"],
    ["Other","Automotive accessories","Electronics"],
    ["Other","Automotive accessories","Interior accessories"],
    ["Other","Automotive accessories","Exterior accessories"],

    ["Brands directory","Browse","A-Z index"],
    ["Brands directory","Browse","Top brands"],
    ["Brands directory","Browse","New brands"],
];

/* =========================
 * Final categories from tuples
 * ========================= */
export const demoCategories = buildTreeFromTuples(tuples);

/* =========================
 * Reducer & helpers for UI
 * ========================= */
const initialState = { path: [] }; // масив вибраних вузлів: [lvl1, lvl2, ...]

function reducer(state, action) {
    switch (action.type) {
        case 'OPEN_LEVEL':
            return { path: [...state.path, action.payload] };
        case 'BACK':
            return { path: state.path.slice(0, -1) };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

function buildPanels(root, path) {
    const panels = [];
    panels.push(root);
    for (let i = 0; i < path.length; i++) {
        panels.push(path[i].children || []);
    }
    return panels.slice(0, 3); // до 3 колонок
}

function LevelList({ items, onPick, depth }) {
    return (
        <ul className="w-1/3 shrink-0 divide-y overflow-y-auto">
            {items.map((c) => (
                <li key={c.id}>
                    <button
                        onClick={() => onPick(c)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                    >
                        <span className="truncate">{c.name}</span>
                        {c.children && c.children.length ? (
                            <span className="ml-3 text-xs text-gray-400">
                {depth >= 2 ? '' : '›'}
              </span>
                        ) : (
                            <span className="ml-3 text-xs text-gray-400">✓</span>
                        )}
                    </button>
                </li>
            ))}
            {!items.length && (
                <li className="px-4 py-6 text-sm text-gray-400">No items</li>
            )}
        </ul>
    );
}

/* =========================
 * Desktop hover (3 колонки)
 * ========================= */
function DropdownBtnDesktop({ categories = demoCategories, onSelect }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const root = categories;
    const level1 = (state.path[0] && state.path[0].children) || [];
    const level2 = (state.path[1] && state.path[1].children) || [];

    const reset = () => dispatch({ type: 'RESET' });

    const openHover = (cat, level) => {
        if (level === 0) {
            dispatch({ type: 'RESET' });
            if (cat.children && cat.children.length) {
                dispatch({ type: 'OPEN_LEVEL', payload: cat });
            }
        } else if (level === 1) {
            if (cat.children && cat.children.length) {
                const lvl0 = state.path[0];
                dispatch({ type: 'RESET' });
                if (lvl0) dispatch({ type: 'OPEN_LEVEL', payload: lvl0 });
                dispatch({ type: 'OPEN_LEVEL', payload: cat });
            } else {
                onSelect && onSelect(cat);
                reset();
            }
        }
    };

    const pickLeaf = (cat) => {
        if (cat.children && cat.children.length) return;
        onSelect && onSelect(cat);
        reset();
    };

    return (
        <div className="relative hidden lg:block">
            <div className="group inline-block">
                <button className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50">
                    Catalog
                </button>

                {/* Flyout */}
                <div className="invisible absolute left-0 mt-2 w-[820px] translate-y-2 rounded-2xl border bg-white p-3 shadow-2xl opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="grid grid-cols-3 gap-3">
                        {/* col 1 */}
                        <ul className="max-h-[60vh] overflow-y-auto divide-y rounded-xl border">
                            {root.map((c) => (
                                <li key={c.id}>
                                    <button
                                        onMouseEnter={() => openHover(c, 0)}
                                        className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 ${
                                            state.path[0] && state.path[0].id === c.id ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        <span className="truncate">{c.name}</span>
                                        <span className="ml-3 text-xs text-gray-400">›</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* col 2 */}
                        <ul className="max-h-[60vh] overflow-y-auto divide-y rounded-xl border">
                            {level1.length ? (
                                level1.map((c) => (
                                    <li key={c.id}>
                                        <button
                                            onMouseEnter={() => openHover(c, 1)}
                                            className={`flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50 ${
                                                state.path[1] && state.path[1].id === c.id ? 'bg-gray-50' : ''
                                            }`}
                                        >
                                            <span className="truncate">{c.name}</span>
                                            <span className="ml-3 text-xs text-gray-400">›</span>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-6 text-sm text-gray-400">Hover a category →</li>
                            )}
                        </ul>

                        {/* col 3 */}
                        <ul className="max-h-[60vh] overflow-y-auto divide-y rounded-xl border">
                            {level2.length ? (
                                level2.map((c) => (
                                    <li key={c.id}>
                                        <button
                                            onClick={() => pickLeaf(c)}
                                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                                        >
                                            <span className="truncate">{c.name}</span>
                                            {!(c.children && c.children.length) && (
                                                <span className="ml-3 text-xs text-gray-400">✓</span>
                                            )}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-6 text-sm text-gray-400">
                                    Hover a subcategory →
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================
 * Mobile drawer (step-by-step)
 * ========================= */
function DropdownBtnMobile({ categories = demoCategories, onSelect, isOpen, setOpen }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const depth = state.path.length;
    const panels = useMemo(() => buildPanels(categories, state.path), [categories, state.path]);
    const breadcrumb = ['Catalog', ...state.path.map((c) => c.name)].slice(0, 3);

    const openNext = (cat) => {
        if (cat.children && cat.children.length) {
            dispatch({ type: 'OPEN_LEVEL', payload: cat });
        } else {
            onSelect && onSelect(cat);
            setOpen(false);
            dispatch({ type: 'RESET' });
        }
    };

    const goBack = () => {
        if (depth === 0) {
            setOpen(false);
            dispatch({ type: 'RESET' });
        } else {
            dispatch({ type: 'BACK' });
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
                className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={goBack}
            />
            <div
                className={`absolute inset-y-0 left-0 w-full sm:max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center gap-2 px-4 py-3 border-b">
                    <button
                        onClick={goBack}
                        className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                        {depth === 0 ? 'Close' : 'Back'}
                    </button>
                    <div className="ml-1 text-sm text-gray-500 truncate">{breadcrumb.join(' / ')}</div>
                </div>

                <div className="relative h-full overflow-hidden">
                    <div
                        className="absolute inset-0 flex h-full w-[300%] transition-transform duration-300"
                        style={{ transform: `translateX(-${Math.min(depth, 2) * 33.3333}%)` }}
                    >
                        {panels.map((list, idx) => (
                            <LevelList key={idx} items={list} onPick={openNext} depth={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Головний компонент
 * - На desktop показує hover меню
 * - На mobile показує кнопку, яка відкриває drawer
 */
export default function DropdownBtn({ categories = demoCategories, onSelect }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-0">
            {/* Mobile trigger */}
            <div className="lg:hidden">
                <button
                    className="rounded-2xl border px-4 py-2 text-sm"
                    onClick={() => setOpen(true)}
                >
                    Catalog
                </button>
            </div>

            {/* Desktop hover */}
            <div className="hidden lg:block">
                <DropdownBtnDesktop
                    categories={categories}
                    onSelect={onSelect || ((leaf) => alert(`Selected: ${leaf.name}`))}
                />
            </div>

            {/* Mobile drawer */}
            <DropdownBtnMobile
                categories={categories}
                onSelect={onSelect || ((leaf) => alert(`Selected: ${leaf.name}`))}
                isOpen={open}
                setOpen={setOpen}
            />
        </div>
    );
}
