export function beforeEnter(
  to: any,
  from: any,
  next: (to?: any) => void
) {
  next();
}