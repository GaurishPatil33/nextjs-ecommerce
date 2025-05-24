"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Title,
  Radio,
  RangeSlider,
  NumberInput,
  Accordion,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useMediaQuery } from "@mantine/hooks";

interface FilterSidebarProps {
  products: Product[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ products }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [initailParams, setinitailParams] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceBounds, setPriceBounds] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });
  const isMobile = useMediaQuery("(min-width:768px)");

  // Selected filters from URL (or default)
  const search = searchParams.get("search");
  const selectedCategories = useMemo(
    () => new Set(searchParams.getAll("cats")),
    [searchParams]
  );
  const selectedBrands = useMemo(
    () => new Set(searchParams.getAll("brand")),
    [searchParams]
  );
  const selectedRatings = useMemo(
    () => new Set(searchParams.getAll("ratings")),
    [searchParams]
  );
  const selectedDiscount = useMemo(
    () => Number(searchParams.get("discount")),
    [searchParams]
  );
  const selectedMinPrice = useMemo(
    () => Number(searchParams.get("minPrice")) || priceBounds.min,
    [searchParams, priceBounds.min]
  );
  const selectedMaxPrice = useMemo(
    () => Number(searchParams.get("maxPrice")) || priceBounds.max,
    [searchParams, priceBounds.max]
  );

  // const search = searchParams.get("search");
  // const selectedCategories = new Set(searchParams.getAll("cats"));
  // const selectedBrands = new Set(searchParams.getAll("brand"));
  // const selectedRatings = new Set(searchParams.getAll("ratings"));
  // const selectedDiscount = Number(searchParams.get("discount"));
  // const selectedMinPrice =
  //   Number(searchParams.get("minPrice")) || priceBounds.min;
  // const selectedMaxPrice =
  //   Number(searchParams.get("maxPrice")) || priceBounds.max;

  useEffect(() => {
    const filteredProducts = selectedCategories.size
      ? products.filter((p) => selectedCategories.has(p.category))
      : products;

    // Dynamic categories
    setCategories(Array.from(new Set(products.map((p) => p.category))).sort());

    // Brands filtered by selected categories
    setBrands(Array.from(new Set(filteredProducts.map((p) => p.brand))).sort());

    // Price
    const prices = filteredProducts.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);

    if (prices.length > 0) {
      setPriceBounds({ min, max });
    }
  }, [products, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    // console.log(params.toString());
    setinitailParams(params.toString());
  }, [search]);

  // helper to update URL
  // multivalue params
  const updateParam = (key: string, value: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    value.forEach((v) => params.append(key, v));
    router.push(`?${params.toString()}`);
  };
  // singlevalue params
  const updateSingleParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const clearAll = () =>
    router.push(initailParams || search ? `?search=${search}` : "?");

  return (
    <aside className="w-58 lg:w-64 border-r pr-4 space-y-6">
      <ScrollArea h="90vh" p={"md"} className="border-b border-gray-200">
        <Stack gap={"md"}>
          <Group pos={"inherit"} style={{ flex: "row" }}>
            <div className="flex justify-between items-center">
              <Title order={2}>Filtres</Title>
              <Button
                size={"sm"}
                color="red"
                variant={"subtle"}
                onClick={clearAll}
                className="text-red-500"
              >
                Clear All
              </Button>
            </div>
          </Group>

          <Divider />

          <Accordion
            multiple={isMobile}
            variant="separated"
            defaultValue={isMobile ? ["brands"] : []}
          >
            {/* categories*/}
            <Accordion.Item value="category">
              <Accordion.Control>
                <Title order={3}>Category</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group
                  value={Array.from(selectedCategories)}
                  onChange={(val) => updateParam("cats", val)}
                >
                  {categories.map((cat, i) => (
                    <Checkbox
                      icon={() => false}
                      key={i}
                      label={cat}
                      value={cat}
                    />
                  ))}
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>

            {/* brands */}
            <Accordion.Item value="brands">
              <Accordion.Control>
                <Title order={3}>Brands</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <Checkbox.Group
                  onChange={(val) => updateParam("brand", val)}
                  value={Array.from(selectedBrands)}
                >
                  {brands.map((brand, i) => (
                    <Checkbox
                      icon={() => false}
                      key={i}
                      label={brand}
                      value={brand}
                    />
                  ))}
                </Checkbox.Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>

          {/* price Range */}
          <div className="">
            <Title order={3}>Price Range</Title>
            <RangeSlider
              min={priceBounds.min}
              max={priceBounds.max}
              step={10}
              px={15}
              value={[selectedMinPrice, selectedMaxPrice]}
              onChangeEnd={([min, max]) => {
                // console.log(min);
                // console.log(selectedMinPrice);

                if (selectedMinPrice !== min) {
                  updateSingleParam("minPrice", min.toString());
                }
                if (selectedMaxPrice !== max) {
                  updateSingleParam("maxPrice", max.toString());
                }
              }}
              marks={[
                {
                  value: priceBounds.min,
                  label: `${Math.round(priceBounds.min)}`,
                },
                {
                  value: priceBounds.max,
                  label: `${Math.round(priceBounds.max)}`,
                },
              ]}
            />
            <Group grow mt={"md"}>
              <NumberInput
                label="Min Price"
                min={priceBounds.min}
                max={selectedMaxPrice}
                value={Math.round(selectedMinPrice)}
                onChange={(e) =>
                  updateSingleParam("minPrice", e?.toString() || "")
                }
              />
              <NumberInput
                label="Max Price"
                min={selectedMinPrice}
                max={priceBounds.max}
                value={Math.round(selectedMaxPrice)}
                onChange={(e) =>
                  updateSingleParam("maxPrice", e?.toString() || "")
                }
              />
            </Group>
          </div>

          {/* ratings */}
          <div>
            <Title order={3}>Customer Ratings</Title>
            <Checkbox.Group
              onChange={(val) => updateParam("ratings", val)}
              value={Array.from(selectedRatings)}
            >
              {[...Array(4)].reverse().map((_, i) => (
                <Checkbox
                  icon={() => false}
                  key={i}
                  label={`${i + 1} ★ & above`}
                  value={`${i + 1}`}
                />
              ))}
            </Checkbox.Group>
          </div>
          {/* discount */}
          <div>
            <Title order={3}>Discount</Title>
            <Radio.Group
              onChange={(val) => updateSingleParam("discount", val)}
              value={selectedDiscount.toString()}
            >
              {[...Array(9)].reverse().map((_, i) => (
                <Radio
                  key={i}
                  label={`${(i + 1) * 10} % or more`}
                  value={`${(i + 1) * 10}`}
                />
              ))}
            </Radio.Group>
          </div>
        </Stack>
      </ScrollArea>
    </aside>
  );
};

export default FilterSidebar;
