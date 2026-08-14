'use client';

import { useState } from 'react';
import { activeCategoriesStore, Category } from '@/data/mockData';
import { Plus, Trash2, Edit3, ArrowRight, FolderTree } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(activeCategoriesStore);
  const [newCatName, setNewCatName] = useState('');
  const [newCatParent, setNewCatParent] = useState('');
  const [newCatImage, setNewCatImage] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug,
      parent_id: newCatParent || null,
      image_url: newCatImage || undefined,
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    
    // Sync back to memory store for other views
    activeCategoriesStore.length = 0;
    activeCategoriesStore.push(...updated);

    // Reset inputs
    setNewCatName('');
    setNewCatParent('');
    setNewCatImage('');
  };

  const handleDeleteCategory = (id: string) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    activeCategoriesStore.length = 0;
    activeCategoriesStore.push(...updated);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSaveEdit = (id: string) => {
    const updated = categories.map((c) =>
      c.id === id ? { ...c, name: editName, slug: editName.toLowerCase().replace(/[^a-z0-9]+/g, '-') } : c
    );
    setCategories(updated);
    activeCategoriesStore.length = 0;
    activeCategoriesStore.push(...updated);
    setEditingId(null);
  };

  // Group parents and children for clean visual hierarchy
  const parentCategories = categories.filter((c) => !c.parent_id);
  const getChildren = (parentId: string) => categories.filter((c) => c.parent_id === parentId);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-wide text-white">Dynamic Category Management</h2>
        <p className="text-zinc-400 text-xs mt-1">
          Add primary folders and nest infinite subgroups dynamically without modifications to the codebase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Creator Form */}
        <form onSubmit={handleAddCategory} className="space-y-4 rounded border border-border-color bg-black/40 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create New Category Node</span>
          </h3>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Category Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Latin Performance Shoes"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Parent Category (Optional Mapping)
            </label>
            <select
              value={newCatParent}
              onChange={(e) => setNewCatParent(e.target.value)}
              className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-zinc-400 focus:border-gold focus:outline-none"
            >
              <option value="">-- No Parent (Creates Root Category) --</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Promo Image URL (Optional)
            </label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/..."
              value={newCatImage}
              onChange={(e) => setNewCatImage(e.target.value)}
              className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold-dark to-gold text-black font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:from-gold hover:to-gold-light"
          >
            Create Category Node
          </button>
        </form>

        {/* Categories Hierarchy visual tree */}
        <div className="space-y-4 rounded border border-border-color bg-black/40 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2">
            <FolderTree className="h-4 w-4" />
            <span>Category Mapping Trees</span>
          </h3>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {parentCategories.map((parent) => {
              const children = getChildren(parent.id);
              const isEditing = editingId === parent.id;

              return (
                <div key={parent.id} className="space-y-2 border border-zinc-900 rounded p-4 bg-zinc-950/60">
                  <div className="flex items-center justify-between">
                    {isEditing ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 bg-black border border-gold rounded text-xs text-white"
                        />
                        <button
                          onClick={() => handleSaveEdit(parent.id)}
                          className="text-xs text-green-500 font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-white">
                          {parent.name}
                        </span>
                        <span className="text-[10px] text-zinc-550 uppercase">Root</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStartEdit(parent)}
                        className="text-zinc-500 hover:text-gold transition-colors duration-200"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(parent.id)}
                        className="text-zinc-500 hover:text-red-500 transition-colors duration-200"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Children mapping */}
                  {children.length > 0 && (
                    <div className="pl-4 border-l border-zinc-900 space-y-2 pt-2">
                      {children.map((child) => {
                        const isChildEditing = editingId === child.id;
                        return (
                          <div key={child.id} className="flex items-center justify-between text-xs py-1">
                            <div className="flex items-center space-x-2 text-zinc-400">
                              <ArrowRight className="h-3 w-3 text-gold" />
                              {isChildEditing ? (
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="px-2 py-0.5 bg-black border border-gold rounded text-[11px] text-white"
                                />
                              ) : (
                                <span>{child.name}</span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {isChildEditing ? (
                                <button
                                  onClick={() => handleSaveEdit(child.id)}
                                  className="text-[10px] text-green-500 font-bold"
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleStartEdit(child)}
                                  className="text-zinc-600 hover:text-gold"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteCategory(child.id)}
                                className="text-zinc-600 hover:text-red-500"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
