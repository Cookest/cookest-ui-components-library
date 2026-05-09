import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A toggle group component matching the web @cookest/ui ToggleGroup.
class CkToggleGroup<T> extends StatelessWidget {
  const CkToggleGroup({
    super.key,
    required this.values,
    required this.onChanged,
    required this.children,
    this.isMultiple = false,
  });

  final List<T> values;
  final ValueChanged<List<T>> onChanged;
  final List<CkToggleGroupItem<T>> children;
  final bool isMultiple;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < children.length; i++) ...[
          _ToggleGroupItemWidget<T>(
            item: children[i],
            isSelected: values.contains(children[i].value),
            onToggle: (selected) {
              if (isMultiple) {
                final newValues = List<T>.from(values);
                if (selected) {
                  newValues.add(children[i].value);
                } else {
                  newValues.remove(children[i].value);
                }
                onChanged(newValues);
              } else {
                if (selected) {
                  onChanged([children[i].value]);
                }
              }
            },
          ),
          if (i < children.length - 1) const SizedBox(width: 4),
        ],
      ],
    );
  }
}

class CkToggleGroupItem<T> {
  const CkToggleGroupItem({
    required this.value,
    required this.child,
    this.enabled = true,
  });

  final T value;
  final Widget child;
  final bool enabled;
}

class _ToggleGroupItemWidget<T> extends StatelessWidget {
  const _ToggleGroupItemWidget({
    required this.item,
    required this.isSelected,
    required this.onToggle,
  });

  final CkToggleGroupItem<T> item;
  final bool isSelected;
  final ValueChanged<bool> onToggle;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final cardColor = isDark
        ? CookestTokens.colorCardDark
        : CookestTokens.colorCardLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final textColor = isDark
        ? CookestTokens.colorTextDark
        : CookestTokens.colorTextLight;

    return GestureDetector(
      onTap: item.enabled ? () => onToggle(!isSelected) : null,
      child: Opacity(
        opacity: item.enabled ? 1.0 : 0.5,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: isSelected ? cardColor : Colors.transparent,
            borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
          ),
          child: DefaultTextStyle(
            style: TextStyle(
              color: isSelected ? headingColor : textColor,
              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
              fontSize: 14,
            ),
            child: item.child,
          ),
        ),
      ),
    );
  }
}
