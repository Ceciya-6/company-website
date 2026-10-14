export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  number: string;
  title: string;
  description: string;
  items: FaqItem[];
};

export const faqCategories: FaqCategory[] = [
  {
    "number": "01",
    "title": "Getting Started",
    "description": "How to start working with us and what to send first.",
    "items": [
      {
        "question": "How do I get started working with you?",
        "answer": "Send reference images, your logo (AI or PNG) and an estimated quantity. No tech pack is needed — we guide you through fabric selection, sizing and construction details. We reply within 24 business hours with fabric options, pricing and a sampling timeline."
      },
      {
        "question": "Do I need a tech pack to place an order?",
        "answer": "No. Many of our clients are new brands with nothing more than reference photos or a Pinterest board. We build the tech pack together with you, based on your references, our fabric library and your fit preferences. Tech pack development is included in the development process at no extra charge."
      },
      {
        "question": "What should I include in my first inquiry?",
        "answer": "Four things help us respond faster: (1) reference images or the names of styles you like; (2) estimated quantity; (3) target market, so we can recommend suitable fabrics and products; (4) your logo file, if you already have one. Even one or two of these are enough for us to get started."
      },
      {
        "question": "Do you work with brands outside Europe and North America?",
        "answer": "Yes. Our clients span more than 30 countries across Europe, North America, Latin America, Australia, the Middle East and Southeast Asia. We hold export licenses, handle all export documentation and ship to any port in the world."
      }
    ]
  },
  {
    "number": "02",
    "title": "MOQ & Pricing",
    "description": "Real minimums, what drives pricing, and how mixed orders work.",
    "items": [
      {
        "question": "What is your minimum order quantity?",
        "answer": "It depends on the order type. Stock styles with your logo: MOQ 100 sets, with mixed colors and sizes allowed. Fully custom development: 300–500 pieces per style per color. Custom Pantone colors: 300–500 pieces per style per color. Samples: 1–2 pieces, with the sample fee refundable after a bulk order."
      },
      {
        "question": "Can I mix sizes and colors within the MOQ?",
        "answer": "For stock styles: yes — within 100 sets, sizes and colors can be mixed freely. For custom development, the MOQ is calculated per style and color: if you want 3 colors, that means 300–500 pieces per style per color. Different sizes within the same color can be mixed freely."
      },
      {
        "question": "Are there volume discounts on larger orders?",
        "answer": "Yes. Unit prices drop significantly at 500, 1,000, 3,000 and 5,000+ pieces. Tell us your target quantity and we will quote across all applicable volumes so you can see the full price curve before deciding. Returning clients receive an additional 2–5% loyalty discount."
      },
      {
        "question": "Can I request a catalog with prices?",
        "answer": "We can send a product catalog PDF with SKU codes and specifications. Because pricing depends on fabric choices, logo application, quantity and packaging, we quote per specific inquiry — a one-size-fits-all price list tends to mislead. Share your specs and we will reply within 24 hours."
      }
    ]
  },
  {
    "number": "03",
    "title": "Sampling & Development",
    "description": "Lead times, costs, revision rounds and reference-garment matching.",
    "items": [
      {
        "question": "How long does sampling take?",
        "answer": "Stock samples with your logo: 7 days. Custom OEM/ODM development samples: 10–15 days, depending on fabric availability. Sample fees are prepaid but refunded once you place an order. Revisions are free until you approve."
      },
      {
        "question": "How much do samples cost?",
        "answer": "Stock samples typically run US$30–80 per piece, depending on fabric and logo application. Custom development samples run US$80–150 per piece. Sample fees are fully refunded against your first bulk order — treat them as a deposit, not a cost."
      },
      {
        "question": "What if the sample isn't right?",
        "answer": "Revisions are free. We iterate — changing fabrics, adjusting fits, moving logo placement — until you are satisfied, however many rounds that takes. Bulk production only starts after your full approval. Most orders need 1–2 sampling rounds; complex custom orders may need 3."
      },
      {
        "question": "Can you match a reference garment or a competitor's product?",
        "answer": "Yes. Send a physical sample or high-resolution photos of the reference garment and we can match fabric, construction and fit. This is one of the fastest development routes — a first sample is usually ready within 10 days, with 2–3 fabric options to compare."
      }
    ]
  },
  {
    "number": "04",
    "title": "Production & Quality Control",
    "description": "Bulk lead times, updates, AQL standards and defect handling.",
    "items": [
      {
        "question": "How long does bulk production take?",
        "answer": "Stock styles with your logo: 20–25 days. Fully custom development: 30–35 days from order confirmation, depending on quantity, fabric lead time and seasonality. If your production window overlaps Chinese New Year (late January to February) or Golden Week (early October), add 10–15 days. We note this in the pro forma invoice (PI)."
      },
      {
        "question": "Will I receive production updates?",
        "answer": "Yes. Once your bulk order enters production, you receive photo updates every 7 days — covering cutting, sewing, printing, quality inspection and packing. You always know where your order stands. Nothing goes silent between deposit and shipment."
      },
      {
        "question": "How do you handle quality control?",
        "answer": "Every order passes three quality control stages: inline inspection during sewing, a final factory inspection, and a re-inspection at our Xiamen warehouse before shipment. Our defect rate target is under 2%. If you need AQL 2.5 or stricter standards, we can arrange third-party inspection (e.g. SGS, Intertek) at your cost."
      },
      {
        "question": "What happens if there are defects in a bulk order?",
        "answer": "We catch defective pieces during pre-shipment quality control and send you photos. We replace the pieces or deduct the amount from the balance payment. If defects are only discovered after arrival at your warehouse, send photos within 30 days of receipt and we will credit the affected items against your next order."
      }
    ]
  },
  {
    "number": "05",
    "title": "Logo, Packaging & Customization",
    "description": "Logo methods, custom Pantone colors, packaging and fabric development.",
    "items": [
      {
        "question": "Which logo application methods do you support?",
        "answer": "Heat transfer, 3D silicone printing, embroidery, sublimation printing, jacquard weaving (seamless-compatible), woven labels and hangtag branding. Different fabrics suit different methods — we recommend the best option for your chosen fabric during sampling. Free logo mockups are provided before sampling starts."
      },
      {
        "question": "Can you do custom Pantone colors?",
        "answer": "Yes. Custom Pantone color matching requires a dedicated dye run, so the MOQ is 300–500 pieces per style per color. We usually ask for a Pantone TCX or TPG code. If you only have reference images, we can mail color swatches (dyed fabric samples) for approval before production."
      },
      {
        "question": "Do you offer custom packaging?",
        "answer": "Yes. We offer custom hangtags, woven labels, care labels, branded poly bags, wrapping paper, boxes and outer cartons — all printable with your brand. We aim to have your products retail- or e-commerce-ready. Packaging samples can be provided at the sampling stage if needed."
      },
      {
        "question": "Can I develop my own fabric?",
        "answer": "We specialize in nylon/spandex and polyester/spandex activewear fabrics, including a buttery 94/6 blend, with GSM ranges of 220–320 g/m². With over 40 stock fabrics, we can sample and screen quickly by compression, stretch, finish and end use."
      }
    ]
  },
  {
    "number": "06",
    "title": "Payment, Shipping & Export",
    "description": "Payment methods, global shipping, customs and certifications.",
    "items": [
      {
        "question": "What payment methods do you offer?",
        "answer": "Samples: 100% prepaid. Bulk (new clients): 30% deposit after PI confirmation, 70% balance before shipment. Bulk (returning clients): 30% deposit, 70% against a copy of the bill of lading. We accept T/T wire transfer, sight L/C (for orders above US$30,000), PayPal (for samples and small orders) and Western Union."
      },
      {
        "question": "Do you ship worldwide?",
        "answer": "Yes. We ship from Xiamen (our primary port) or Shenzhen if needed. Both air and sea freight are available. We support all major Incoterms including FOB, EXW, CIF and DDP. Under DDP we handle customs clearance at the destination; under FOB you arrange your own freight forwarder."
      },
      {
        "question": "Can you help with customs clearance in my country?",
        "answer": "For DDP orders, yes — we work with freight partners for door-to-door delivery including destination customs clearance. For FOB orders, we provide all necessary export documents (commercial invoice, packing list, certificate of origin, bill of lading) and you handle import clearance. We are happy to share sample documents in advance so your broker can pre-review them."
      },
      {
        "question": "Which certificates do you hold?",
        "answer": "We meet BSCI (Business Social Compliance Initiative) requirements for ethical sourcing and labor standards, azo-free dye compliance for EU exports and REACH chemical safety compliance. Full audit documentation is available on request at the quotation stage."
      }
    ]
  },
  {
    "number": "07",
    "title": "Trust & Factory Verification",
    "description": "How to verify a real factory, book a visit and handle disputes.",
    "items": [
      {
        "question": "How do I confirm YOMEGA is a real factory and not a trading agent?",
        "answer": "Ask for a live video call from the production floor, direct export documentation from Xiamen Mega Garment Co., Ltd., and named client cases such as Goosgym Sports, Powercut Clothing, Grazi Marotti Sportswear, Motivelli and KRAG. Trading companies can show polished videos but cannot demonstrate cutting, sewing, inspection and packing in real time while matching factory export records. See the full checklist in 'How to Choose a Good Activewear Factory'."
      },
      {
        "question": "Can I visit your factory? What does a visit look like and how far ahead should I book?",
        "answer": "Yes. A standard visit runs 1–2 days at our Xiamen headquarters, covering cutting, sewing, quality inspection, packing and the showroom. On request we can also arrange a visit to our Yiwu seamless production line; Xiamen remains the main base for cut-and-sew, inspection, packing and export. Ideally give us two weeks' notice, one week minimum. Motivelli visited Xiamen and signed the contract within 48 hours — see Case 14: the Motivelli factory visit."
      },
      {
        "question": "What is the real difference between working with YOMEGA directly and an Alibaba Gold Supplier agent?",
        "answer": "A Gold Supplier badge verifies paid Alibaba membership and transaction history — not factory ownership. Working with YOMEGA directly means your client team talks straight to production, export documents use our own license, AQL 2.5 inspection is done in-house, and there is no 15–25% trader commission. In return, you follow our process and accept our MOQs (e.g. 100 sets) rather than a trader's flexible promises."
      },
      {
        "question": "Can I get factory photos, a video tour or third-party audit reports before sampling?",
        "answer": "Yes. We share unedited workshop photos and can arrange a live video tour. Before sampling, you can sign an NDA to review our BSCI and OEKO-TEX certification documents. If your brand requires verification by SGS, Bureau Veritas or Intertek, we can host third-party audit teams — we only protect other clients' production details."
      },
      {
        "question": "What if this is my first import and I have no sourcing experience?",
        "answer": "We guide startup founders through Incoterms, tech pack reading, reference photo briefs, customs documents and shipping options. Goosgym Sports started with no factory relationships and went from first inquiry to a full 40-foot container in just 12 weeks — see Case 10: Goosgym Netherlands."
      },
      {
        "question": "How do you handle disputes if something goes wrong in production?",
        "answer": "We log where the issue occurred, provide photo evidence, propose rework, replacement or refund options, and update the QC checklist to prevent recurrence. Our goal is to catch problems at fabric intake, in production or at final packing — not after shipment. If the defect rate exceeds AQL 2.5 thresholds, we hold the shipment until the issue is resolved."
      },
      {
        "question": "What is your refund policy if QC issues appear in a bulk order after I pay the balance?",
        "answer": "For new clients, the 70% balance is only paid after goods pass inspection. If goods fail our AQL 2.5 final inspection, we hold and rework them before shipping. If verified issues are found after arrival, we replace critically defective pieces; for major defects we typically offer a refund or remake against your next production; for minor defects we re-inspect against AQL tolerances."
      }
    ]
  },
  {
    "number": "08",
    "title": "True Cost Beyond Unit Price",
    "description": "What FOB covers, hidden fees, payment terms and refund policies.",
    "items": [
      {
        "question": "What does the FOB price actually include and exclude?",
        "answer": "FOB Xiamen includes fabric, trims, labor, AQL 2.5 inspection, basic polybag and carton packing, factory loading and Chinese export documentation. It does not include international freight, destination duties, VAT, last-mile delivery, custom hangtags, woven labels or express sample shipping. See our FOB CIF DDP guide for shipping terms."
      },
      {
        "question": "Beyond the unit price, what hidden costs should I budget for?",
        "answer": "Budget for sampling fees, revised sample fees, courier charges, custom packaging, Pantone dye runs, possible fit-adjustment charges and destination duties/VAT. A sensible first capsule budget includes the garments plus these ancillary costs, so the unit price does not surprise you later."
      },
      {
        "question": "How big is the real cost difference between a $5 activewear piece and a $15 one?",
        "answer": "A $5 FOB garment usually means basic polyester-spandex fabric, simple cut-and-sew construction, standard colors and looser inspection. A $15 FOB garment can mean 94/6 polyamide-spandex fabric, seamless or fully-fashioned construction, Pantone-matched colors, AQL 2.5 inspection and more refined pattern work. Fabric quality and quality control account for most of the difference."
      },
      {
        "question": "Can I pay sample fees by PayPal, Wise or credit card?",
        "answer": "For sample fees below US$500 we accept PayPal (with a surcharge) or Wise. Bulk deposits and balances go by bank transfer, as this is standard for commercial transactions. Many new clients start with PayPal for samples and switch to bank transfer for bulk orders."
      },
      {
        "question": "What are your deposit ratio and balance payment timing?",
        "answer": "Standard terms for new clients: 30% deposit before fabric purchasing, 70% balance after inspection and before shipment. Returning clients can negotiate adjusted terms after several successful quarters. Because fabric and trims are purchased upfront, we do not offer net-30 terms."
      },
      {
        "question": "What happens to my deposit if my brand cannot continue mid-order?",
        "answer": "It depends on the production stage. Before fabrics are cut, we refund whatever has not been spent on fabric or trims. Once cutting or bulk sewing has started, the deposit covers materials and labor already invested, but we credit any remaining value toward a future order wherever possible. We treat it as cost recovery, not a penalty."
      },
      {
        "question": "How do I avoid unexpected tariffs in my country?",
        "answer": "Before shipping, have your broker confirm the HS code and duty rate, then choose FOB, CIF or DDP accordingly. FOB keeps the factory invoice amount lowest but you carry the import costs. DDP costs more upfront but is more predictable for small Shopify sellers or first-time importers."
      }
    ]
  },
  {
    "number": "09",
    "title": "Speed, Lead Times & Reorder Reality",
    "description": "Rush production, realistic timelines, fabric reserves and restock speed.",
    "items": [
      {
        "question": "Can you expedite production? What are the rush fees and risks?",
        "answer": "Yes, within technical limits. Stock-fabric projects with logos can sometimes be rushed to about 4–6 weeks for an extra fee; custom Pantone colors or complex constructions should not be rushed below 6 weeks. Expediting can compress color-approval windows and buffer time, so we explain the risks clearly before accepting."
      },
      {
        "question": "Why do factories quote 8 weeks but delivery actually takes 12?",
        "answer": "Many quotes cover bulk production only — excluding sampling, Pantone revisions, export documentation, inspection and shipping preparation. Our realistic purchase-order-to-FOB cycle is usually 8–12 weeks because it includes sampling, fabric approval, bulk production and final AQL inspection. Unrealistic timelines are common in sourcing."
      },
      {
        "question": "What is the realistic reorder lead time for season two with stock fabric versus a cold start?",
        "answer": "If fabric is reserved and the pattern approved, reorder lead time is about 25–35 days. A cold-start reorder with new fabric sourcing and color matching runs closer to 8–10 weeks. Reserved fabric keeps Shopify brands on shelf and avoids color variance."
      },
      {
        "question": "If I order in August, can I still get delivery for the holiday season?",
        "answer": "By sea freight, Black Friday or holiday delivery usually requires ordering by late July to mid-August, depending on the destination. After that, air freight may be needed, which raises costs. We work backwards from your sell dates to plan production and shipping, rather than making vague promises."
      },
      {
        "question": "Do you reserve fabric for repeat orders? How does that affect shipping speed?",
        "answer": "Yes, for qualifying bulk orders. Using the same dye lot reduces restock rounds and color variance risk. For orders above 1,000 pieces we can reserve fabric free of charge for a period; longer reservations are negotiable case by case."
      }
    ]
  },
  {
    "number": "10",
    "title": "Quality Truths",
    "description": "Why activewear pills, goes see-through, fades, or loses logos.",
    "items": [
      {
        "question": "Why does activewear pill, and how do you prevent it in production?",
        "answer": "Pilling comes from short fibers, poor yarn quality, weak finishing and abrasion. We reduce pilling by choosing long-staple yarns, heat setting, tight finishing control and abrasion testing before bulk production. See 'What Causes Pilling in Activewear' for the full factory explanation."
      },
      {
        "question": "What makes leggings squat-proof — fabric, knit density or pattern?",
        "answer": "All three matter. Squat-proof leggings need adequate GSM, tight knit density and a pattern layout that protects the glutes under stretch. Our default premium fabric range is 230–280 g/m², and we run daylight squat tests before bulk production. See the leggings fabric GSM guide."
      },
      {
        "question": "Why does my reorder look slightly different from season one?",
        "answer": "Usually it is color variance. Unless a factory seals dye lots, keeps approved swatches and re-checks in daylight, every dye lot can shift slightly. We keep approved swatches and, for larger orders, reserve fabric to keep reorders color-consistent. See the Pantone color workflow."
      },
      {
        "question": "How long do 3D silicone, heat transfer and embroidered logos last?",
        "answer": "3D silicone is the best choice for stretch zones and survives repeated washes when cured properly. Heat transfer is cheaper for capsules but edges can lift over time. Embroidery lasts best on stable fabrics but can pucker on high-stretch zones. We match the method to fabric, stretch and placement."
      },
      {
        "question": "What is the performance difference between 230 g/m² and 280 g/m² leggings?",
        "answer": "230 g/m² feels lighter and cooler, suited to hot yoga and high-intensity training. 280 g/m² offers more compression and better opacity. Heavier fabric uses more material and costs more, but it raises perceived quality for the wearer."
      },
      {
        "question": "Why do some sports bras ride up during high-impact training?",
        "answer": "Usually the underband is too narrow, strap geometry pulls diagonally, or the cup fabric stretches more than the band. High-impact sports bras need a reinforced underband, matched elastic ratios and movement-based fit testing — not just static mannequin fitting."
      },
      {
        "question": "What is camel toe, and how does gusset design prevent it?",
        "answer": "Camel toe is the visible pressure on the front seam under stretch. Curved gussets, offset seams or flat-lock construction shift pressure away from the front center line. See 'Front Seam Visibility and Gusset Design'."
      },
      {
        "question": "Why do waistbands roll down on cheap high-waist leggings?",
        "answer": "Waistbands usually lack adequate elastic width, internal reinforcement or the right rise-to-hip transition. Our high-waist styles use wider waistbands and are movement-tested on models to stay put through yoga, HIIT and all-day wear."
      }
    ]
  },
  {
    "number": "11",
    "title": "Fabric & Material Details",
    "description": "94/6 polyamide, naked-feel vs buttery-soft, four-way stretch, recycled fabrics.",
    "items": [
      {
        "question": "What is 94/6 polyamide-elastane, and why is it a premium spec?",
        "answer": "It means 94% polyamide and 6% elastane. Polyamide gives a soft hand feel, good recovery and moisture management, while elastane provides stretch. It is our default premium seamless formulation, and we offer other ratios to meet your compression and stretch requirements."
      },
      {
        "question": "What is the difference between naked-feel and buttery-soft fabrics?",
        "answer": "Naked-feel fabric is smooth and cool, like a second skin — usually a high-gauge polyamide-elastane blend with a calendered finish. Buttery-soft fabric is brushed or peached, and usually better for athleisure. We select fabrics by end use: training, yoga or casual."
      },
      {
        "question": "What is the difference between four-way and two-way stretch?",
        "answer": "Two-way stretch fabrics stretch mainly in one direction; four-way stretch fabrics stretch both horizontally and vertically. Leggings, sports bras and unitards need four-way stretch for freedom of movement. Loose hoodies or shorts can sometimes use two-way stretch."
      },
      {
        "question": "Can you source recycled fabrics with rPET or ECONYL and GRS certification?",
        "answer": "Yes. rPET is readily available, and ECONYL can be used for certain nylon programs. GRS chain-of-custody documentation is available for every order. Recycled fabric programs usually carry higher MOQs and costs than virgin fabrics — see the sustainable activewear manufacturer section."
      },
      {
        "question": "Which fabrics suit hot yoga versus cold-weather training?",
        "answer": "Hot yoga needs lightweight, quick-dry, moisture-wicking fabric around 180–220 g/m². Cold-weather training needs heavier brushed or thermal fabrics around 260–310 g/m². Cotton blends are comfortable but dry too slowly for high-intensity training."
      },
      {
        "question": "What is the difference between brushed and unbrushed fleece for joggers?",
        "answer": "Brushed fleece has a soft inner face that traps heat. Unbrushed terry is lighter, smoother and more breathable. Premium winter sweats usually use a heavier brushed fleece, while transitional joggers suit unbrushed terry."
      }
    ]
  },
  {
    "number": "12",
    "title": "Sizing & Western Fits",
    "description": "True 2XL/3XL, Santoni cylinder sizes, US/UK/EU/AU sizing, fit adjustments.",
    "items": [
      {
        "question": "Can you produce truly Western-sized 2XL and 3XL seamless garments?",
        "answer": "Yes. Our Yiwu seamless factory runs large Santoni machines with 17–21 inch cylinders, producing wider body-shape seamless panels for true Western 2XL/3XL sizing. Many factories using 13–15 inch cylinders effectively top out at XL."
      },
      {
        "question": "Why do many Chinese factories quietly cap seamless sizes at L or XL?",
        "answer": "It is machine economics. Small cylinders are cheaper and cover common Asian and Western sizes (XS–L). Large cylinders cost more and only pay off for factories producing full Western size runs at volume."
      },
      {
        "question": "What are Santoni large-cylinder machines, and why does cylinder size matter?",
        "answer": "Santoni is the leading brand of seamless circular knitting machines. Cylinder diameter controls the maximum tube width and shapes body mapping. Larger cylinders enable larger sizes and more flexible zoned compression."
      },
      {
        "question": "How do US, UK, EU and AU sizes differ in your patterns?",
        "answer": "We grade on a US base block and adjust per market. UK and AU sizes typically run larger, while EU grading is often slightly slimmer. For global brands we recommend one base grading standard with regional size labels."
      },
      {
        "question": "Can you adjust rise, waistband or gusset on a standard legging pattern?",
        "answer": "Yes. Rise height, waistband and gusset shape are all common adjustments during sampling. Major redesigns are quoted separately, but fit adjustments are part of normal development, and your custom pattern is never reused for other clients."
      },
      {
        "question": "Do you offer petite or tall patterns?",
        "answer": "Yes, for leggings, jumpsuits and some unitards. Petite grading shortens inseam and body lengths; tall grading adds length at the inseam and rise where needed. To keep MOQs manageable, most emerging brands launch a regular fit first and add one priority fit later."
      }
    ]
  },
  {
    "number": "13",
    "title": "Comparison Questions",
    "description": "China vs Vietnam vs Bangladesh, OEM vs ODM, trader vs direct, brand quality tiers.",
    "items": [
      {
        "question": "China, Vietnam or Bangladesh — which is better for a Shopify activewear brand selling into the US?",
        "answer": "For small-to-mid volume premium activewear, China usually offers the strongest overall combination of fabric variety, speed and technical capability. Vietnam can help for tariff-sensitive programs, and Bangladesh wins on high-volume basics. See the China vs Vietnam vs Bangladesh comparison."
      },
      {
        "question": "OEM vs ODM — what is the practical difference for a small brand?",
        "answer": "OEM means you supply the design and own the pattern. ODM means you select factory-developed styles and brand them. ODM is better for fast early testing; OEM builds stronger brand differentiation over multiple seasons. We support both."
      },
      {
        "question": "Should I work with a trading company or directly with a factory?",
        "answer": "Trading companies simplify early sourcing but add margin and communication layers. Once quality consistency, restock speed and unit economics matter, a direct factory relationship makes more sense. YOMEGA works factory-direct with no trader markup."
      },
      {
        "question": "Alo, Vuori or DFYNE quality levels — can you match that?",
        "answer": "For construction, fabric hand feel, seamless body mapping and AQL 2.5 quality control, yes — we serve private-label programs at that level. Proprietary corporate fabrics from global tier-one brands require larger R&D budgets, but most premium brand requirements are achievable at our scale."
      },
      {
        "question": "Stock fabric plus custom logo vs full custom OEM — which makes sense?",
        "answer": "For a first capsule of 100–300 sets, stock fabric with your logo is usually the smarter route: faster lead time, lower cost and no custom-dye MOQs. Move to full custom OEM after product-market fit is proven."
      }
    ]
  },
  {
    "number": "14",
    "title": "Sustainability & 2026 Compliance",
    "description": "PFAS-free, rPET, GRS certification, biodegradable claims, EU Green Claims Directive.",
    "items": [
      {
        "question": "What is PFAS-free, and why is California requiring it by 2026?",
        "answer": "PFAS are persistent chemicals used in some water-repellent finishes. Apparel regulations in California and other US states require brands selling into these markets to provide PFAS-free documentation for fabrics. We can arrange third-party lab testing where needed."
      },
      {
        "question": "Is recycled polyester actually better than virgin polyester for activewear?",
        "answer": "rPET (recycled polyethylene terephthalate) reduces virgin plastic use and production energy while performing comparably to polyester in many activewear applications. It is not a perfect sustainability solution — microplastic shedding remains — but with GRS traceability it is a significant improvement over virgin polyester."
      },
      {
        "question": "What is GRS certification, and how do I verify the chain of custody?",
        "answer": "GRS verifies recycled content and the chain of custody from source to finished product. Ask for the certificate number and lot documentation, then verify it in the registry. Generic recycled-content claims without lot traceability are not sufficient."
      },
      {
        "question": "Are biodegradable activewear claims real or greenwashing?",
        "answer": "As of 2026, most synthetic stretch activewear claiming biodegradability is still mostly greenwashing. Truly biodegradable performance fabrics remain limited. If a supplier claims a biodegradable polyester-spandex blend, ask for third-party biodegradation test reports and certification body documentation."
      },
      {
        "question": "How do I avoid greenwashing under the EU Green Claims Directive?",
        "answer": "Make only specific, verifiable claims: recycled content percentages, compositions, certificates and lots. Avoid vague words like 'eco-friendly' unless evidence supports them. We provide documentation so your product-page claims match the actual fabric."
      }
    ]
  },
  {
    "number": "15",
    "title": "Brand Stages & Scaling Decisions",
    "description": "First-capsule MOQs, when to switch suppliers, Pantone timing, scaling to 8,000 pieces.",
    "items": [
      {
        "question": "I am launching my first brand — should I start with 100 sets or 500?",
        "answer": "Unless you have proven demand, start with a 100-set capsule. A 100-set capsule lets you test fit, fabric and colorways against real buyers while keeping mistakes recoverable. See our low-MOQ activewear OEM service."
      },
      {
        "question": "When should I switch from a trading company to a direct factory like YOMEGA?",
        "answer": "Switch when annual volume, quality consistency and restock speed matter more than a trader's convenience. Warning signs include vague fabric information, blocked factory visits, color variance and slow reorders. Most clients switch in their second or third season."
      },
      {
        "question": "How do I know my factory can scale to 8,000 pieces by season three?",
        "answer": "Ask for specific scaling references, category capacity, client-team stability and reorder lead times at 500 versus 5,000 pieces. Vague answers mean you will likely outgrow the factory sooner than expected."
      },
      {
        "question": "Should I commit to custom Pantone colors in season one, or start from stock colors?",
        "answer": "Start from stock colors until you can move 300–500 pieces per style per color. Move to custom Pantone colors in season two, once volume justifies the dye lots and you know your best sellers. See the Pantone color workflow."
      }
    ]
  }
];
