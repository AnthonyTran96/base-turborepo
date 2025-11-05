export const IconSvgs = {
  ICON_CALENDAR: () => import('@repo/ui/assets/svg/ic_calendar.svg').then((mod) => mod.default),
  ICON_CALL: () => import('@repo/ui/assets/svg/ic_call.svg').then((mod) => mod.default),
  ICON_DROP_DOWN: () => import('@repo/ui/assets/svg/ic_drop_down.svg').then((mod) => mod.default),
  ICON_ARROW_LEFT: () => import('@repo/ui/assets/svg/arrow-left.svg').then((mod) => mod.default),
  ICON_EYE_SPLASH: () => import('@repo/ui/assets/svg/eye-splash.svg').then((mod) => mod.default),
  ICON_EYE_OPEN: () => import('@repo/ui/assets/svg/eye-open.svg').then((mod) => mod.default),
  ICON_INFO_SOLID: () => import('@repo/ui/assets/svg/ic_info_solid.svg').then((mod) => mod.default),
  ICON_CHECK_GREEN: () =>
    import('@repo/ui/assets/svg/ic_check_green.svg').then((mod) => mod.default),
  ICON_WARNING: () => import('@repo/ui/assets/svg/ic_warning.svg').then((mod) => mod.default),
  ICON_ERROR: () => import('@repo/ui/assets/svg/ic_error.svg').then((mod) => mod.default),
  ICON_CLOSE_TAKE_NOTE: () =>
    import('@repo/ui/assets/svg/ic_close_take_note.svg').then((mod) => mod.default),
  ICON_CHECK: () => import('@repo/ui/assets/svg/ic_check.svg').then((mod) => mod.default),
  ICON_ARROW_CIRCLE_UP: () =>
    import('@repo/ui/assets/svg/arrow-circle-up.svg').then((mod) => mod.default),
  ICON_BILL: () => import('@repo/ui/assets/svg/ic_bill.svg').then((mod) => mod.default),
  ICON_EDIT: () => import('@repo/ui/assets/svg/ic_edit.svg').then((mod) => mod.default),
  ICON_QUESTION: () => import('@repo/ui/assets/svg/question.svg').then((mod) => mod.default),
  ICON_CLOSE: () => import('@repo/ui/assets/svg/ic_close.svg').then((mod) => mod.default),
  ICON_SEARCH: () => import('@repo/ui/assets/svg/ic_search.svg').then((mod) => mod.default),
  ICON_DELETE: () => import('@repo/ui/assets/svg/ic_delete.svg').then((mod) => mod.default)
} as const;

export type IconSvgTypes = keyof typeof IconSvgs;
