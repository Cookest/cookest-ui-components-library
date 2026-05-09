import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A radio group component matching the web @cookest/ui RadioGroup.
class CkRadioGroup<T> extends StatelessWidget {
  const CkRadioGroup({
    super.key,
    required this.value,
    required this.onChanged,
    required this.children,
    this.spacing = 8.0,
  });

  final T value;
  final ValueChanged<T>? onChanged;
  final List<CkRadioGroupItem<T>> children;
  final double spacing;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (int i = 0; i < children.length; i++) ...[
          _RadioGroupItemWidget<T>(
            item: children[i],
            groupValue: value,
            onChanged: onChanged,
          ),
          if (i < children.length - 1) SizedBox(height: spacing),
        ],
      ],
    );
  }
}

class CkRadioGroupItem<T> {
  const CkRadioGroupItem({
    required this.value,
    required this.label,
    this.enabled = true,
  });

  final T value;
  final Widget label;
  final bool enabled;
}

class _RadioGroupItemWidget<T> extends StatelessWidget {
  const _RadioGroupItemWidget({
    required this.item,
    required this.groupValue,
    this.onChanged,
  });

  final CkRadioGroupItem<T> item;
  final T groupValue;
  final ValueChanged<T>? onChanged;

  @override
  Widget build(BuildContext context) {
    final isSelected = item.value == groupValue;
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return GestureDetector(
      onTap: item.enabled ? () => onChanged?.call(item.value) : null,
      child: Opacity(
        opacity: item.enabled ? 1.0 : 0.5,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            AnimatedContainer(
              duration: const Duration(milliseconds: 150),
              width: 18,
              height: 18,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: isSelected ? CookestTokens.colorPrimaryDEFAULT : borderColor,
                  width: 1.5,
                ),
              ),
              child: Center(
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 150),
                  width: isSelected ? 10 : 0,
                  height: isSelected ? 10 : 0,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: CookestTokens.colorPrimaryDEFAULT,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            item.label,
          ],
        ),
      ),
    );
  }
}
