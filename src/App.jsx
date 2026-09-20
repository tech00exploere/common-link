import { useMemo, useState } from "react";
import { companies as defaultCompanies } from "./data/companies";

function CompanyCard({ company }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            {company.name}
          </h2>
          {company.isCustom && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
              New
            </span>
          )}
        </div>
        <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          {company.type}
        </span>
        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <span>📍</span> {company.location}
        </p>
      </div>

      <a
        href={company.careersUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition active:scale-95 shadow-sm"
      >
        Careers ↗
      </a>
    </div>
  );
}

function AddCompanyModal({ isOpen, onClose, onAdd, existingTypes }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Product");
  const [customType, setCustomType] = useState("");
  const [location, setLocation] = useState("India");
  const [careersUrl, setCareersUrl] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a company name.");
      return;
    }
    if (!careersUrl.trim()) {
      setError("Please enter the careers link.");
      return;
    }

    let formattedUrl = careersUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const finalType = type === "Other" ? (customType.trim() || "Technology") : type;

    onAdd({
      name: name.trim(),
      type: finalType,
      location: location.trim() || "India",
      careersUrl: formattedUrl,
      isCustom: true,
    });

    setName("");
    setType("Product");
    setCustomType("");
    setLocation("India");
    setCareersUrl("");
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="text-lg font-semibold text-gray-900">Add Company & Link</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. OpenAI"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Industry / Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black bg-white"
            >
              {existingTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="Other">Other (custom)...</option>
            </select>
          </div>

          {type === "Other" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Custom Industry / Type
              </label>
              <input
                type="text"
                placeholder="e.g. Robotics, HealthTech"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. India / Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Careers Portal URL *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. openai.com/careers or https://..."
              value={careersUrl}
              onChange={(e) => setCareersUrl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 transition"
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [companies, setCompanies] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("common_link_companies");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return defaultCompanies;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const categories = useMemo(() => {
    const types = Array.from(new Set(companies.map((c) => c.type))).sort();
    return ["All", ...types];
  }, [companies]);

  const existingTypes = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.type))).sort();
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === "All" || c.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [companies, search, selectedType]);

  const handleAddCompany = (newCompany) => {
    const updated = [newCompany, ...companies];
    setCompanies(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("common_link_companies", JSON.stringify(updated));
    }
    setIsModalOpen(false);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Reset back to default 100 companies?")) {
      setCompanies(defaultCompanies);
      if (typeof window !== "undefined") {
        localStorage.removeItem("common_link_companies");
      }
    }
  };

  const hasCustomAdditions = companies.length > defaultCompanies.length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔗</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Common Link
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Official career portals for top tech companies. Direct links, no middlemen.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-center rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition active:scale-95 shadow-sm flex items-center gap-1.5"
          >
            <span className="text-base font-bold">＋</span> Add Company
          </button>
        </header>

        <section className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies by name or domain..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-xs text-gray-400 hover:text-gray-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  selectedType === cat
                    ? "bg-black text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <div className="flex items-center gap-2">
              <span>
                Showing <strong className="text-gray-900">{filteredCompanies.length}</strong> of {companies.length} companies
              </span>
              {hasCustomAdditions && (
                <button
                  onClick={handleResetToDefault}
                  className="text-xs text-red-600 hover:underline ml-2"
                >
                  Reset to default
                </button>
              )}
            </div>
            {(search || selectedType !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedType("All");
                }}
                className="underline hover:text-gray-900"
              >
                Reset filters
              </button>
            )}
          </div>
        </section>

        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
            <p className="text-gray-500 text-sm">No companies match your search.</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedType("All");
                }}
                className="text-xs font-medium text-black underline"
              >
                Clear filters
              </button>
              <span className="text-gray-300">&bull;</span>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-medium text-black underline"
              >
                + Add "{search}"
              </button>
            </div>
          </div>
        )}

        <footer className="text-center text-xs text-gray-400 pt-8 pb-4">
          Common Link &copy; {new Date().getFullYear()}
        </footer>
      </div>

      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCompany}
        existingTypes={existingTypes}
      />
    </div>
  );
}
