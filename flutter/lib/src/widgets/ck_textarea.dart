import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// Textarea size matching the React Textarea component.
enum CkTextareaSize { sm, md, lg }

/// A multi-line text area component matching the web @cookest/ui Textarea.
///
/// Mirrors the Input component's visual language — same focus ring,
/// error state, and label treatment.
///
/// ```dart
/// CkTextarea(
///   label: 'Recipe Notes',
///   placeholder: 'Describe the recipe...',
///   maxLength: 500,
///   showCount: true,
///   onChanged: (val) => setState(() => _notes = val),
/// )
/// ```
class CkTextarea extends StatefulWidget {
  const CkTextarea({
    super.key,
    this.controller,
    this.label,
    this.placeholder,
    this.helperText,
    this.errorText,
    this.maxLength,
    this.showCount = false,
    this.minLines = 3,
    this.maxLines = 6,
    this.size = CkTextareaSize.md,
    this.disabled = false,
    this.readOnly = false,
    this.onChanged,
    this.onSubmitted,
    this.inputFormatters,
    this.focusNode,
  });

  final TextEditingController? controller;
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final int? maxLength;
  final bool showCount;
  final int minLines;
  final int maxLines;
  final CkTextareaSize size;
  final bool disabled;
  final bool readOnly;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final List<TextInputFormatter>? inputFormatters;
  final FocusNode? focusNode;

  @override
  State<CkTextarea> createState() => _CkTextareaState();
}

class _CkTextareaState extends State<CkTextarea> {
  late TextEditingController _controller;
  late FocusNode _focusNode;
  bool _focused = false;

  @override
  void initState() {
    super.initState();
    _controller = widget.controller ?? TextEditingController();
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_onFocusChange);
    _controller.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    if (widget.controller == null) _controller.dispose();
    if (widget.focusNode == null) {
      _focusNode.removeListener(_onFocusChange);
      _focusNode.dispose();
    }
    super.dispose();
  }

  void _onFocusChange() => setState(() => _focused = _focusNode.hasFocus);

  double get _fontSize {
    switch (widget.size) {
      case CkTextareaSize.sm:
        return CookestTokens.fontSizeXs;
      case CkTextareaSize.md:
        return CookestTokens.fontSizeSm;
      case CkTextareaSize.lg:
        return CookestTokens.fontSizeBase;
    }
  }

  EdgeInsets get _padding {
    switch (widget.size) {
      case CkTextareaSize.sm:
        return const EdgeInsets.all(8);
      case CkTextareaSize.md:
        return const EdgeInsets.all(12);
      case CkTextareaSize.lg:
        return const EdgeInsets.all(16);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hasError = widget.errorText != null;

    final borderColor = hasError
        ? CookestTokens.colorStatusError
        : _focused
            ? CookestTokens.colorPrimaryDEFAULT
            : isDark
                ? CookestTokens.colorBorderDark
                : CookestTokens.colorBorderLight;

    final bgColor = widget.disabled
        ? (isDark
            ? CookestTokens.colorSurfaceDark.withAlpha(128)
            : CookestTokens.colorSurfaceMutedLight)
        : (isDark
            ? CookestTokens.colorSurfaceDark
            : CookestTokens.colorSurfaceLight);

    final textColor = isDark
        ? CookestTokens.colorTextDark
        : CookestTokens.colorTextLight;

    final mutedColor = isDark
        ? CookestTokens.colorMutedDark
        : CookestTokens.colorMutedLight;

    final fg = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (widget.label != null)
          Padding(
            padding: const EdgeInsets.only(bottom: 6),
            child: Text(
              widget.label!,
              style: GoogleFonts.inter(
                fontSize: CookestTokens.fontSizeSm,
                fontWeight: CookestTokens.fontWeightMedium,
                color: fg,
              ),
            ),
          ),
        AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            color: bgColor,
            borderRadius: BorderRadius.circular(CookestTokens.radiusXl),
            border: Border.all(
              color: borderColor,
              width: _focused ? 2 : 1,
            ),
            boxShadow: _focused
                ? [
                    BoxShadow(
                      color: (hasError
                              ? CookestTokens.colorStatusError
                              : CookestTokens.colorPrimaryDEFAULT)
                          .withAlpha(51),
                      blurRadius: 0,
                      spreadRadius: 3,
                    ),
                  ]
                : null,
          ),
          child: TextField(
            controller: _controller,
            focusNode: _focusNode,
            enabled: !widget.disabled,
            readOnly: widget.readOnly,
            minLines: widget.minLines,
            maxLines: widget.maxLines,
            maxLength: widget.maxLength,
            inputFormatters: widget.inputFormatters,
            onChanged: widget.onChanged,
            onSubmitted: widget.onSubmitted,
            style: GoogleFonts.inter(
              fontSize: _fontSize,
              color: textColor,
            ),
            decoration: InputDecoration(
              hintText: widget.placeholder,
              hintStyle: GoogleFonts.inter(
                fontSize: _fontSize,
                color: mutedColor,
              ),
              contentPadding: _padding,
              border: InputBorder.none,
              counterText: '', // hide native counter
            ),
          ),
        ),
        // Footer row: helper/error text + optional character count
        if (widget.helperText != null ||
            widget.errorText != null ||
            widget.showCount)
          Padding(
            padding: const EdgeInsets.only(top: 4, left: 4, right: 4),
            child: Row(
              children: [
                Expanded(
                  child: hasError
                      ? Text(
                          widget.errorText!,
                          style: TextStyle(
                            fontSize: CookestTokens.fontSizeXs,
                            color: CookestTokens.colorStatusError,
                          ),
                        )
                      : widget.helperText != null
                          ? Text(
                              widget.helperText!,
                              style: TextStyle(
                                fontSize: CookestTokens.fontSizeXs,
                                color: mutedColor,
                              ),
                            )
                          : const SizedBox.shrink(),
                ),
                if (widget.showCount && widget.maxLength != null)
                  Text(
                    '${_controller.text.length}/${widget.maxLength}',
                    style: TextStyle(
                      fontSize: CookestTokens.fontSizeXs,
                      color: _controller.text.length >= widget.maxLength!
                          ? CookestTokens.colorStatusError
                          : mutedColor,
                    ),
                  ),
              ],
            ),
          ),
      ],
    );
  }
}
