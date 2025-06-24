import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface Column {
  header: string;
  accessorKey: string;
  cell?: (props: { getValue: () => any }) => React.ReactNode;
}

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  pagination?: PaginationProps;
  loading?: boolean;
}

export function DataTable({
  columns,
  data = [],
  onEdit,
  onDelete,
  pagination,
  loading = false,
}: DataTableProps) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                {columns.map((column) => (
                  <TableHead key={column.accessorKey} className="font-semibold">
                    {column.header}
                  </TableHead>
                ))}
                {(onEdit || onDelete) && (
                  <TableHead className="text-right sticky right-0 bg-slate-50">
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="text-center h-24 text-muted-foreground"
                  >
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : safeData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No results found
                  </TableCell>
                </TableRow>
              ) : (
                safeData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.accessorKey}>
                        {column.cell
                          ? column.cell({
                              getValue: () => row[column.accessorKey],
                            })
                          : row[column.accessorKey]}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete) && (
                      <TableCell className="text-right space-x-2 sticky right-0 bg-white">
                        {onEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(row)}
                          >
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => onDelete(row)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-gray-500">
            {pagination.total > 0 ? (
              <>
                Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                {Math.min(
                  pagination.page * pagination.pageSize,
                  pagination.total
                )}{" "}
                of {pagination.total} results
              </>
            ) : (
              "No results"
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.page === 1 || loading}
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || loading}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">
              {pagination.page} / {Math.max(pagination.totalPages, 1)}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages || loading}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.totalPages)}
              disabled={pagination.page === pagination.totalPages || loading}
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = (status: string) => {
    const statusMap: Record<string, { className: string }> = {
      Available: {
        className:
          "bg-green-100 text-green-800 hover:bg-green-100 border-green-500",
      },
      Unavailable: {
        className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-500",
      },
      Pending: {
        className:
          "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-500",
      },
      Completed: {
        className:
          "bg-green-100 text-green-800 hover:bg-green-100 border-green-500",
      },
      Cancelled: {
        className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-500",
      },
      Active: {
        className:
          "bg-green-100 text-green-800 hover:bg-green-100 border-green-500",
      },
      Inactive: {
        className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-500",
      },
    };
    return (
      statusMap[status] || {
        className:
          "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-500",
      }
    );
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(status).className
      )}
    >
      {status}
    </span>
  );
}
