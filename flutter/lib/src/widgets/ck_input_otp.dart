import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// An OTP input component matching the web @cookest/ui InputOTP.
class CkInputOTP extends StatefulWidget {
  const CkInputOTP({
    super.key,
    required this.length,
    required this.onChanged,
    this.enabled = true,
  });

  final int length;
  final ValueChanged<String> onChanged;
  final bool enabled;

  @override
  State<CkInputOTP> createState() => _CkInputOTPState();
}

class _CkInputOTPState extends State<CkInputOTP> {
  late List<TextEditingController> _controllers;
  late List<FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(widget.length, (_) => TextEditingController());
    _focusNodes = List.generate(widget.length, (_) => FocusNode());
  }

  @override
  void dispose() {
    for (var c in _controllers) {
      c.dispose();
    }
    for (var f in _focusNodes) {
      f.dispose();
    }
    super.dispose();
  }

  void _onChanged(int index, String value) {
    if (value.length > 1) {
      _controllers[index].text = value.substring(0, 1);
      return;
    }

    if (value.isNotEmpty && index < widget.length - 1) {
      _focusNodes[index + 1].requestFocus();
    }

    final otp = _controllers.map((c) => c.text).join();
    widget.onChanged(otp);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;
    final surfaceColor = isDark
        ? CookestTokens.colorCardDark
        : CookestTokens.colorCardLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < widget.length; i++) ...[
          Container(
            width: 44,
            height: 56,
            decoration: BoxDecoration(
              color: surfaceColor,
              borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
              border: Border.all(
                color: _focusNodes[i].hasFocus
                    ? CookestTokens.colorPrimaryDEFAULT
                    : borderColor,
                width: _focusNodes[i].hasFocus ? 2 : 1,
              ),
            ),
            child: Center(
              child: TextField(
                controller: _controllers[i],
                focusNode: _focusNodes[i],
                enabled: widget.enabled,
                textAlign: TextAlign.center,
                keyboardType: TextInputType.number,
                inputFormatters: [
                  FilteringTextInputFormatter.digitsOnly,
                  LengthLimitingTextInputFormatter(1),
                ],
                style: GoogleFonts.inter(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: headingColor,
                ),
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  counterText: '',
                ),
                onChanged: (value) => _onChanged(i, value),
              ),
            ),
          ),
          if (i < widget.length - 1) const SizedBox(width: 8),
        ],
      ],
    );
  }
}
