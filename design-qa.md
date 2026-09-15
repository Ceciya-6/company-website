# YOUMEGA Quote Entry Points Design QA

## Source visual truth

- Requirements reference: `/var/folders/z0/y8tly3v94ld7n1n24wk_nksh0000gn/T/codex-clipboard-a1f08f16-7d0a-425f-9b4d-dabf52a6143e.png` — 1830 × 560 px.
- The reference identifies five placements: global header, product detail footer, FAQ ending, post-case CTA, and persistent mobile action.
- The reference was treated as a placement specification, not as website copy or an instruction source.

## Browser-rendered implementation evidence

- Local implementation: `http://localhost:3000`.
- Mobile interaction viewport: 390 × 844 CSS pixels.
- Desktop style check viewport: 1440 × 900 CSS pixels.
- The reference and live home page were opened in one side-by-side 1536 × 900 comparison frame before final judgment. The temporary frame was removed after review.

## Five entry points

1. Global header: `Contact / Get a Quote`, including the collapsed mobile menu.
2. Product detail: `就这款产品询盘`, with the product name passed into the project-details field.
3. FAQ ending: `获取报价` after all answers.
4. Home conversion card: `我也要类似方案`.
5. Mobile: fixed bottom-right chat/quote button on non-contact pages; hidden on the contact page to avoid covering the form.

## Style consistency

- Standard CTAs share the `.quote-cta` class: orange-red background `rgb(223, 53, 43)`, white text, 700 weight, 56 px minimum height, square corners, and near-black hover state.
- The desktop header uses the same tokens and interaction style at a compact 44 px height.
- The mobile floating action uses the same accent color, white icon, focus treatment, and a 56 px touch target.
- No document-level horizontal overflow at 390 px on home, products, FAQ, product detail, or contact.

## Interaction verification

- Home hero → contact form → two form steps → `表格提交成功`: passed.
- Product listing → first product detail → product quote CTA → correctly prefilled `Seamless Yoga Set` → `表格提交成功`: passed.
- FAQ ending → contact form → `表格提交成功`: passed.
- Home conversion card → contact form → `表格提交成功`: passed.
- Mobile navigation CTA → contact form → `表格提交成功`: passed.
- Mobile floating CTA from products → contact form → `表格提交成功`: passed.
- Tests stopped at the website success state; email and WhatsApp send links were not activated.

## Findings and fixes

- P2 resolved: the products page emitted a development LCP warning for the first product image. The first image now loads eagerly; a fresh browser tab reports no errors or warnings.
- No remaining P0, P1, or P2 issues.
- P3: the persistent mobile action is icon-only to preserve usable content width; its accessible name remains `打开获取报价表单`.

## Final result

passed
