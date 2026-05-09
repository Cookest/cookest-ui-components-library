import 'package:flutter/material.dart';
import '../tokens/cookest_tokens.dart';

/// A checkbox component matching the web @cookest/ui Checkbox.
class CkCheckbox extends StatelessWidget {
  const CkCheckbox({
    super.key,
    required this.value,
    required this.onChanged,
    this.enabled = true,
  });

  final bool value;
  final ValueChanged<bool>? onChanged;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return GestureDetector(
      onTap: enabled ? () => onChanged?.call(!value) : null,
      child: Opacity(
        opacity: enabled ? 1.0 : 0.5,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          width: 18,
          height: 18,
          decoration: BoxDecoration(
            color: value ? CookestTokens.colorPrimaryDEFAULT : Colors.transparent,
            borderRadius: BorderRadius.circular(CookestTokens.radiusSm),
            border: Border.all(
              color: value ? CookestTokens.colorPrimaryDEFAULT : borderColor,
              width: 1.5,
            ),
          ),
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 150),
            opacity: value ? 1.0 : 0.0,
            child: const Icon(
              Icons.check,
              size: 14,
              color: CookestTokens.colorWhite,
            ),
          ),
        ),
      ),
    );
  }
}
