import React from 'react';
import { Eye, Trash2, Calendar, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';

const InquiryTable = ({
  inquiries = [],
  loading = false,
  pagination = { totalCount: 0, totalPages: 1, currentPage: 1, limit: 10 },
  onPageChange,
  onViewDetails,
  onDeleteInquiry,
}) => {
  const { totalCount, totalPages, currentPage, limit } = pagination;

  // Format creation timestamp
  const formatDate = (dateStr) => {
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  // Skeleton Loader Row
  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" /></td>
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" /></td>
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" /></td>
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" /></td>
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" /></td>
      <td className="px-6 py-4.5"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" /></td>
      <td className="px-6 py-4.5 flex gap-2"><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-10" /><div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-10" /></td>
    </tr>
  );

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden transition-colors duration-300">
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800/80 text-left text-sm text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-950 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4 font-display">Client Name</th>
              <th className="px-6 py-4 font-display">Company</th>
              <th className="px-6 py-4 font-display">Email Address</th>
              <th className="px-6 py-4 font-display">Industry</th>
              <th className="px-6 py-4 font-display">Size</th>
              <th className="px-6 py-4 font-display">Submitted At</th>
              <th className="px-6 py-4 font-display">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {loading ? (
              Array.from({ length: limit }).map((_, i) => <SkeletonRow key={i} />)
            ) : inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr
                  key={inquiry._id}
                  className="hover:bg-slate-50/55 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {inquiry.fullName}
                  </td>
                  <td className="px-6 py-4">{inquiry.companyName}</td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {inquiry.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400">
                      {inquiry.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {inquiry.companySize}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(inquiry.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onViewDetails(inquiry)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 border-none dark:bg-slate-800 dark:hover:bg-slate-700"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onDeleteInquiry(inquiry._id)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 dark:text-rose-400 border-none"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-16">
                  <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full text-slate-400 dark:text-slate-500">
                      <FileText className="h-10 w-10" />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 font-display">
                      No Inquiries Found
                    </h4>
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-normal">
                      Adjust your search keyword or filters to look for other submissions.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="bg-slate-55 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between transition-colors">
          <div className="text-xs text-slate-400 dark:text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {(currentPage - 1) * limit + 1}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {Math.min(currentPage * limit, totalCount)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {totalCount}
            </span>{' '}
            inquiries
          </div>
          
          <div className="flex items-center gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="p-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pNum = idx + 1;
              return (
                <Button
                  key={pNum}
                  variant={currentPage === pNum ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onPageChange(pNum)}
                  disabled={loading}
                  className="w-8 h-8 flex justify-center items-center"
                >
                  {pNum}
                </Button>
              );
            })}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="p-1.5"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
