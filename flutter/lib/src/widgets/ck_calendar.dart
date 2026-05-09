import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../tokens/cookest_tokens.dart';

/// A calendar component matching the web @cookest/ui Calendar.
class CkCalendar extends StatelessWidget {
  const CkCalendar({
    super.key,
    required this.selectedDate,
    required this.onDateSelected,
    this.initialDate,
    this.firstDate,
    this.lastDate,
  });

  final DateTime? selectedDate;
  final ValueChanged<DateTime> onDateSelected;
  final DateTime? initialDate;
  final DateTime? firstDate;
  final DateTime? lastDate;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final surfaceColor = isDark
        ? CookestTokens.colorSurfaceDark
        : CookestTokens.colorSurfaceLight;
    final headingColor = isDark
        ? CookestTokens.colorHeadingDark
        : CookestTokens.colorHeadingLight;
    final borderColor = isDark
        ? CookestTokens.colorBorderDark
        : CookestTokens.colorBorderLight;

    return Theme(
      data: Theme.of(context).copyWith(
        colorScheme: ColorScheme.fromSeed(
          seedColor: CookestTokens.colorPrimaryDEFAULT,
          primary: CookestTokens.colorPrimaryDEFAULT,
          onPrimary: Colors.white,
          surface: surfaceColor,
          onSurface: headingColor,
        ),
        textTheme: TextTheme(
          labelLarge: GoogleFonts.inter(fontWeight: FontWeight.bold),
          bodyMedium: GoogleFonts.inter(),
        ),
      ),
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(CookestTokens.radiusMd),
          border: Border.all(color: borderColor),
          color: surfaceColor,
        ),
        child: CalendarDatePicker(
          initialDate: initialDate ?? selectedDate ?? DateTime.now(),
          firstDate: firstDate ?? DateTime(2000),
          lastDate: lastDate ?? DateTime(2100),
          onDateChanged: onDateSelected,
        ),
      ),
    );
  }
}
