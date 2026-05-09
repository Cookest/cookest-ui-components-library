import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';
import 'ck_button.dart';

/// A pagination component matching the web @cookest/ui Pagination.
class CkPagination extends StatelessWidget {
  const CkPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    required this.onPageChanged,
  });

  final int currentPage;
  final int totalPages;
  final ValueChanged<int> onPageChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        CkButton(
          variant: CkButtonVariant.ghost,
          size: CkButtonSize.md,
          onPressed: currentPage > 1 ? () => onPageChanged(currentPage - 1) : null,
          iconLeft: const Icon(Icons.chevron_left, size: 16),
          child: const Text('Previous'),
        ),
        const SizedBox(width: 8),
        for (int i = 1; i <= totalPages; i++) ...[
          if (i == 1 || i == totalPages || (i >= currentPage - 1 && i <= currentPage + 1))
            _PaginationLink(
              page: i,
              isActive: i == currentPage,
              onPressed: () => onPageChanged(i),
            )
          else if (i == currentPage - 2 || i == currentPage + 2)
            const _PaginationEllipsis(),
        ],
        const SizedBox(width: 8),
        CkButton(
          variant: CkButtonVariant.ghost,
          size: CkButtonSize.md,
          onPressed: currentPage < totalPages ? () => onPageChanged(currentPage + 1) : null,
          iconRight: const Icon(Icons.chevron_right, size: 16),
          child: const Text('Next'),
        ),
      ],
    );
  }
}

class _PaginationLink extends StatelessWidget {
  const _PaginationLink({
    required this.page,
    required this.isActive,
    required this.onPressed,
  });

  final int page;
  final bool isActive;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: CkButton(
        variant: isActive ? CkButtonVariant.secondary : CkButtonVariant.ghost,
        size: CkButtonSize.md,
        onPressed: onPressed,
        child: Text('$page'),
      ),
    );
  }
}

class _PaginationEllipsis extends StatelessWidget {
  const _PaginationEllipsis();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4),
      child: Icon(Icons.more_horiz, size: 16, color: mutedColor),
    );
  }
}
