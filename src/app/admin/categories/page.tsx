"use client";
import MediaUploader from "@/components/admin components/MediaUpload";
import Confirmationbox from "@/components/Confirmationbox";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Edit2,
  Plus,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";

import React, { useEffect, useMemo, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  media: {
    url: string;
    public_id: string;
    type?: string;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  children?: Category[];
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  parentId: string;
  media: {
    url: string;
    public_id: string;
    type?: string;
  }[];
  isActive: boolean;
}

interface CategoryFormProps {
  editingCategory?: Category | null;
  categories?: Category[];
  onClose: () => void;
  onSubmit: (formData: CategoryFormData) => void;
}
const CategoryForm: React.FC<CategoryFormProps> = ({
  editingCategory,
  categories = [],
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    parentId: "",
    media: [],
    isActive: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFlatCategories = (cats: Category[] = categories): Category[] => {
    const flat: Category[] = [];
    cats.forEach((cat) => {
      flat.push(cat);
      if (cat.children) {
        flat.push(...getFlatCategories(cat.children));
      }
    });
    return flat;
  };
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description || "",
        parentId: editingCategory.parentId || "",
        media: editingCategory.media || "",
        isActive: editingCategory.isActive,
      });
    } else {
      setFormData({
        name: "",
        slug: "",
        description: "",
        parentId: "",
        media: [],
        isActive: true,
      });
    }
  }, [editingCategory]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && { slug: generateSlug(value) }),
    }));
  };
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleMediaChange = (media: Category["media"]) => {
    setFormData((prev) => ({ ...prev, media: media }));
  };

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed inset-0 md:max-w-[60%] md:max-h-[30%] md:left-1/3 md:top-1/2  z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full mt-2 max-h-[95%] md:max-h-[60vh] overflow-y-auto p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4 p-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parent Category
              </label>
              <select
                name="parentId"
                value={formData.parentId}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No Parent (Main Category)</option>
                {getFlatCategories()
                  .filter((cat) => cat._id !== editingCategory?._id)
                  .map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.parentId ? `— ${cat.name}` : cat.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image or Thumbnail
              </label>
              <MediaUploader
                media={formData.media}
                onChange={handleMediaChange}
                types={["image"]}
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                Active
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={16} />
                <span>
                  {isSubmitting
                    ? "Saving..."
                    : editingCategory
                    ? "Update"
                    : "Create"}
                </span>
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["1", "4"])
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<Category>();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/categories");
      if (!res) {
        throw new Error("failed to fetch categories");
      }
      setCategories(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const confirmDelete = (category: Category) => {
    setDeleteCategory(category);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    try {
      await axios.delete(`/api/product?id=${deleteCategory._id}`);
      setDeleteCategory(undefined);
      setShowConfirm(false);
      fetchCategories();
      // setProducts((prev) => prev.filter((p: any) => p._id !== id));
    } catch (err) {
      console.error("Error deleting...", err);
    }
  };

  const handleSubmit = async (formData: CategoryFormData) => {
    try {
      console.log(formData);
      if (editingCategory) {
        console.log("editing", formData);

        await axios.put("/api/categories", {
          ...formData,
          _id: editingCategory._id,
        });
      } else {
        await axios.post("/api/categories", formData);
      }
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      setError("Failed to save category");
    }
  };

  /// Get category by ID
  const getCategoryById = (id: string): Category | undefined => {
    return categories.find((cat) => cat._id === id);
  };

  // Get parent category name
  const getParentName = (parentId?: string): string => {
    if (!parentId) return "None";
    const parent = getCategoryById(parentId);
    return parent ? parent.name : "Unknown";
  };

  // Get category depth level
  const getCategoryDepth = (category: Category): number => {
    let depth = 0;
    let currentParentId = category.parentId;

    while (currentParentId) {
      depth++;
      const parent = getCategoryById(currentParentId);
      currentParentId = parent?.parentId;
    }

    return depth;
  };

  // Get children categories
  const getChildrenCategories = (parentId: string): Category[] => {
    return categories.filter((cat) => cat.parentId === parentId);
  };

  // Check if category has children
  const hasChildren = (categoryId: string): boolean => {
    return categories.some((cat) => cat.parentId === categoryId);
  };

  // Toggle category expansion
  const toggleExpansion = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  // Get available parent categories (excluding self and descendants)
  const getAvailableParents = (): Category[] => {
    if (!editingCategory) return categories;

    const getAllDescendantIds = (parentId: string): string[] => {
      const children = categories.filter((cat) => cat.parentId === parentId);
      let allIds = children.map((cat) => cat._id);

      for (const child of children) {
        allIds = [...allIds, ...getAllDescendantIds(child._id)];
      }

      return allIds;
    };

    const excludedIds = [
      editingCategory._id,
      ...getAllDescendantIds(editingCategory._id),
    ];
    return categories.filter((cat) => !excludedIds.includes(cat._id));
  };

  // Build hierarchical structure
  const buildHierarchy = useMemo(() => {
    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    // First pass: create map of all categories
    categories.forEach((cat) => {
      categoryMap.set(cat._id, { ...cat, children: [] });
    });

    // Second pass: build hierarchy
    categories.forEach((cat) => {
      const category = categoryMap.get(cat._id)!;
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(category);
        }
      } else {
        rootCategories.push(category);
      }
    });

    return rootCategories;
  }, [categories]);

  // Flatten hierarchy for display
  const flattenedCategories = useMemo(() => {
    const flatten = (
      cats: Category[],
      level = 0
    ): Array<Category & { level: number }> => {
      const result: Array<Category & { level: number }> = [];

      cats.forEach((cat) => {
        result.push({ ...cat, level });
        if (cat.children && expandedCategories.has(cat._id)) {
          result.push(...flatten(cat.children, level + 1));
        }
      });

      return result;
    };

    return flatten(buildHierarchy);
  }, [buildHierarchy, expandedCategories]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return flattenedCategories;

    return flattenedCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [flattenedCategories, searchTerm]);

  return (
    <div className="p-3 px-2 min-h-screen max-w-screen mt-15 md:mt-2 space-y-2 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Categories Management
        </h1>
        <p className="text-gray-600">
          Manage your e-commerce product categories and subcategories
        </p>
      </div>
      <div className="mb-6 flex  gap-4 justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingCategory(null);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {loading && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="grid gap-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Parent
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    {/* <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th> */}
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => {
                      const depth = getCategoryDepth(category);
                      const hasChildrenCategories = hasChildren(category._id);
                      const isExpanded = expandedCategories.has(category._id);

                      return (
                        <tr key={category._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div
                                style={{ marginLeft: `${depth * 20}px` }}
                                className="flex items-center space-x-2"
                              >
                                {hasChildrenCategories && (
                                  <button
                                    onClick={() =>
                                      toggleExpansion(category._id)
                                    }
                                    className="p-1 hover:bg-gray-100 rounded"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown size={16} />
                                    ) : (
                                      <ChevronRight size={16} />
                                    )}
                                  </button>
                                )}
                                {!hasChildrenCategories && (
                                  <div className="w-6" />
                                )}
                                <div className="flex gap-2 items-center">
                                  {category.media[0]?.url && (
                                    <img
                                      src={category.media[0]?.url}
                                      alt={category.name}
                                      className="w-10 h-10 object-contain rounded"
                                    />
                                  )}
                                  <p className="font-medium text-gray-900">
                                    {category.name}
                                  </p>
                                  {category.description && (
                                    <p className="text-sm text-gray-500">
                                      {category.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              /{category.slug}
                            </code>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {getParentName(category.parentId)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                category.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {category.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          {/* <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">
                              {category.createdAt.toString()}
                            </span>
                          </td> */}
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditCategory(category)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => confirmDelete(category)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <p className="text-gray-500 text-lg">
                          No categories found
                        </p>
                        <p className="text-gray-400">
                          Try adjusting your search or create a new category
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <CategoryForm
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
          categories={categories}
        />
      )}
      <Confirmationbox
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message={`Are you sure, you want to delete "${deleteCategory?.name}"? this can not be undone! `}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default page;
