'use client';

import { useState } from 'react';
import { activeSizeChartsStore, SizeChart } from '@/data/mockData';
import { Plus, Trash2, Ruler, Save, AlignLeft } from 'lucide-react';

export default function AdminSizeCharts() {
  const [charts, setCharts] = useState<SizeChart[]>(activeSizeChartsStore);

  // Creator state
  const [chartName, setChartName] = useState('');
  const [headersString, setHeadersString] = useState('EU Size, UK Size, Foot Length (cm), US Women');
  
  // Guidelines state
  const [guideKey, setGuideKey] = useState('');
  const [guideValue, setGuideValue] = useState('');
  const [tempGuidelines, setTempGuidelines] = useState<Record<string, string>>({
    'Foot Length': 'Measure heel to longest toe.'
  });

  // Grid rows input states
  const [tempRows, setTempRows] = useState<any[]>([]);
  const [currentRowData, setCurrentRowData] = useState<Record<string, string>>({});

  const parsedHeaders = headersString.split(',').map((h) => h.trim()).filter(Boolean);

  const handleAddGuideline = () => {
    if (!guideKey || !guideValue) return;
    setTempGuidelines({ ...tempGuidelines, [guideKey]: guideValue });
    setGuideKey('');
    setGuideValue('');
  };

  const handleAddGridRow = () => {
    setTempRows([...tempRows, currentRowData]);
    setCurrentRowData({});
  };

  const handleCreateChart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chartName || parsedHeaders.length === 0) return;

    const newChart: SizeChart = {
      id: `sc-${Date.now()}`,
      name: chartName,
      guidelines: tempGuidelines,
      headers: parsedHeaders,
      rows: tempRows,
    };

    const updated = [...charts, newChart];
    setCharts(updated);
    activeSizeChartsStore.length = 0;
    activeSizeChartsStore.push(...updated);

    // Reset fields
    setChartName('');
    setHeadersString('EU Size, UK Size, Foot Length (cm), US Women');
    setTempGuidelines({ 'Foot Length': 'Measure heel to longest toe.' });
    setTempRows([]);
    setCurrentRowData({});
  };

  const handleDeleteChart = (id: string) => {
    const updated = charts.filter((c) => c.id !== id);
    setCharts(updated);
    activeSizeChartsStore.length = 0;
    activeSizeChartsStore.push(...updated);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-wide text-white">Size Chart Builder</h2>
        <p className="text-zinc-400 text-xs mt-1">
          Create sports measurements tables and assign them to footwear or clothing lines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Creator Form */}
        <form onSubmit={handleCreateChart} className="lg:col-span-2 space-y-6 rounded border border-border-color bg-black/40 p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2 border-b border-border-color pb-3">
            <Plus className="h-4.5 w-4.5" />
            <span>Build Sizing Table</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Chart Title *</label>
              <input
                type="text"
                required
                value={chartName}
                onChange={(e) => setChartName(e.target.value)}
                placeholder="e.g. Standard Footwear Sizing"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Table Headers (Comma Separated) *</label>
              <input
                type="text"
                required
                value={headersString}
                onChange={(e) => setHeadersString(e.target.value)}
                placeholder="EU Size, UK Size, Foot Length"
                className="w-full px-4 py-2.5 bg-black border border-border-color rounded text-xs text-white placeholder-zinc-700 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Guidelines Planner */}
          <div className="border border-border-color rounded p-4 bg-zinc-950/60 space-y-3">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase block">Measure Instructions Guidelines</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Measure Label (e.g. Foot Length)"
                value={guideKey}
                onChange={(e) => setGuideKey(e.target.value)}
                className="px-3 py-2 bg-black border border-zinc-800 rounded text-xs"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="How to measure instructions"
                  value={guideValue}
                  onChange={(e) => setGuideValue(e.target.value)}
                  className="flex-grow px-3 py-2 bg-black border border-zinc-800 rounded text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddGuideline}
                  className="px-3 py-2 border border-gold text-gold rounded text-xs font-semibold hover:bg-gold hover:text-black transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* List of current guidelines */}
            {Object.keys(tempGuidelines).length > 0 && (
              <div className="text-[10px] text-zinc-400 space-y-1 pt-2">
                {Object.entries(tempGuidelines).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center border-b border-zinc-900 pb-1">
                    <span className="font-bold text-white uppercase">{key}:</span>
                    <span className="text-zinc-500 truncate max-w-[250px]">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Table Row Data Planner */}
          {parsedHeaders.length > 0 && (
            <div className="border border-border-color rounded p-4 bg-zinc-950/60 space-y-4">
              <span className="text-[10px] font-bold tracking-widest text-gold uppercase block">Grid Row Values Input</span>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {parsedHeaders.map((header) => (
                  <div key={header} className="space-y-1">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase">{header}</span>
                    <input
                      type="text"
                      placeholder="Value"
                      value={currentRowData[header] || ''}
                      onChange={(e) =>
                        setCurrentRowData({ ...currentRowData, [header]: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-black border border-zinc-800 rounded text-xs"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddGridRow}
                className="w-full py-2 border border-dashed border-zinc-800 hover:border-gold hover:bg-gold/5 text-zinc-400 hover:text-gold rounded text-xs font-semibold transition-all duration-200"
              >
                Add Row To Table Grid
              </button>

              {/* Rows counter */}
              {tempRows.length > 0 && (
                <div className="text-[10px] text-zinc-400">
                  Currently planned: <span className="text-white font-bold">{tempRows.length} rows</span>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-black font-bold uppercase text-xs tracking-widest rounded transition-all duration-200 hover:from-gold hover:to-gold-light"
          >
            Create Size Chart Guide
          </button>
        </form>

        {/* Existing Charts list */}
        <div className="space-y-4 rounded border border-border-color bg-black/40 p-6 h-[720px] overflow-y-auto">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold flex items-center space-x-2 border-b border-border-color pb-3">
            <Ruler className="h-4.5 w-4.5" />
            <span>Active Guides ({charts.length})</span>
          </h3>

          <div className="divide-y divide-zinc-900">
            {charts.map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-white">{c.name}</h4>
                  <span className="text-[10px] text-zinc-500 uppercase">{c.headers.length} Columns / {c.rows.length} Rows</span>
                </div>
                <button
                  onClick={() => handleDeleteChart(c.id)}
                  className="p-1.5 border border-zinc-900 text-zinc-500 hover:text-red-500 hover:border-red-500/20 rounded transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
