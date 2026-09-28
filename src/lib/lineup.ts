// Works out a shop's line-up: the picks for its kind of shop that suit the
// machines on its floor, grouped by brand in the order the brands first appear.

import { BRANDS, FLOORS, LINES, type Brand, type FloorId, type ProductLine, type ShopKind } from "../data/brands";

export type BrandPick = { line: ProductLine; why: string };
export type BrandGroup = { brand: Brand; picks: readonly BrandPick[] };
export type Lineup = { groups: readonly BrandGroup[]; others: readonly Brand[] };

export function lineupFor(shop: ShopKind, floor: FloorId): Lineup {
  const machines: readonly string[] = FLOORS.find((f) => f.value === floor)?.machines ?? [];
  const groups: { brand: Brand; picks: BrandPick[] }[] = [];

  for (const pick of shop.picks) {
    const line = LINES.find((l) => l.id === pick.line);
    if (line === undefined || !line.machines.some((m) => machines.includes(m))) continue;
    let group = groups.find((g) => g.brand.id === line.brand);
    if (group === undefined) {
      const brand = BRANDS.find((b) => b.id === line.brand);
      if (brand === undefined) continue;
      group = { brand, picks: [] };
      groups.push(group);
    }
    group.picks.push({ line, why: pick.why });
  }

  const others = BRANDS.filter((b) => !groups.some((g) => g.brand.id === b.id));
  return { groups, others };
}
