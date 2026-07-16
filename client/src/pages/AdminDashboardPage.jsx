import React, { useState, useEffect } from 'react';
import { getInquiries, deleteInquiry } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchFilterBar from '../components/admin/SearchFilterBar';
import InquiryTable from '../components/admin/InquiryTable';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { Calendar, Building, Mail, Phone, Globe, Briefcase, Users, MessageSquare } from 'lucide-react';

const AdminDashboardPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  // Filter States
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('All');
  const [country, setCountry] = useState('All');
  const [page, setPage] = useState(1);

  // Debounce search query to reduce API calls
  const debouncedSearch = useDebounce(search, 400);

  // Modal States
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Fetch inquiries from API
  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const queryParams = {
        page,
        limit: pagination.limit,
      };

      if (debouncedSearch && debouncedSearch.trim() !== '') {
        queryParams.search = debouncedSearch;
      }
      if (industry && industry !== 'All') {
        queryParams.industry = industry;
      }
      if (country && country !== 'All') {
        queryParams.country = country;
      }

      const res = await getInquiries(queryParams);
      if (res.success) {
        setInquiries(res.data.inquiries);
        setPagination(res.data.pagination);
      }
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: 'Failed to retrieve inquiries. Please check backend connection.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when parameters modify
  useEffect(() => {
    fetchInquiries();
  }, [debouncedSearch, industry, country, page]);

  // Reset filters
  const handleResetFilters = () => {
    setSearch('');
    setIndustry('All');
    setCountry('All');
    setPage(1);
  };

  // Handle Page switching
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // View details modal trigger
  const handleOpenDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsDetailsOpen(true);
  };

  // Delete modal trigger
  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  // Perform deletion request
  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setDeleteLoading(true);
    try {
      await deleteInquiry(deleteTargetId);
      setToast({
        show: true,
        message: 'Inquiry record successfully deleted.',
        type: 'success',
      });
      setIsDeleteOpen(false);
      setDeleteTargetId(null);
      // Fetch fresh dataset, reset page if needed
      if (inquiries.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchInquiries();
      }
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        message: 'Could not delete inquiry. Please try again.',
        type: 'error',
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  // Date formatting helper for viewer
  const formatFullDate = (dateStr) => {
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 w-full space-y-6">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Inquiry Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View, audit, search and filter incoming sales lead inquiries from Helloaaye CRM.
          </p>
        </div>

        {/* Filter Toolbar */}
        <SearchFilterBar
          search={search}
          setSearch={setSearch}
          industry={industry}
          setIndustry={setIndustry}
          country={country}
          setCountry={setCountry}
          onReset={handleResetFilters}
        />

        {/* Inquiry Table grid */}
        <InquiryTable
          inquiries={inquiries}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onViewDetails={handleOpenDetails}
          onDeleteInquiry={handleOpenDelete}
        />
      </main>

      <Footer />

      {/* Confirmation Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        title="Delete Inquiry Submission"
        message="Are you sure you want to delete this inquiry? This action removes the data permanently and cannot be undone."
        confirmText="Permanently Delete"
        cancelText="Keep Record"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteTargetId(null);
        }}
        loading={deleteLoading}
        variant="danger"
      />

      {/* Details Modal Viewer */}
      <Modal
        isOpen={isDetailsOpen}
        onCancel={() => {
          setIsDetailsOpen(false);
          setSelectedInquiry(null);
        }}
      >
        {selectedInquiry && (
          <div className="space-y-6 pt-2">
            {/* Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
                Inquiry Details
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mt-0.5">
                {selectedInquiry.fullName}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatFullDate(selectedInquiry.createdAt)}</span>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Grid fields info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2">
                <Building className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedInquiry.companyName}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Users className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company Size</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedInquiry.companySize} employees
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Mail className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 select-all font-mono text-xs">
                    {selectedInquiry.email}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Phone className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 select-all">
                    {selectedInquiry.phoneNumber}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Globe className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Country</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedInquiry.country}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Briefcase className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry</div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedInquiry.industry}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Message block */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Message Requirements</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-150/60 dark:border-slate-800 select-all whitespace-pre-line">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Close CTA */}
            <div className="flex justify-end pt-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setSelectedInquiry(null);
                }}
              >
                Close Viewer
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default AdminDashboardPage;
