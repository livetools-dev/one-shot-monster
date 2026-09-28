// The one screen, at "/": the shop says what sort of work it does and what is
// on its floor, and the screen introduces the Livetools brands and product
// lines that suit it, best fit first, with the other brands in brief below.

import { Fragment, useState, type ReactNode } from "react";
import { Badge, Card, Code, Divider, Empty, Form, Num, Prose, RadioGroup, Stack } from "@livetools/ui";
import type { RadioItem } from "@livetools/ui";
import { FLOORS, SHOP_KINDS, type FloorId } from "../data/brands";
import { lineupFor, type BrandGroup, type BrandPick } from "../lib/lineup";

const SHOP_ITEMS: readonly RadioItem[] = SHOP_KINDS.map((s) => ({ value: s.id, label: s.label, hint: s.hint }));
const FLOOR_ITEMS: readonly RadioItem[] = FLOORS.map((f) => ({ value: f.value, label: f.label }));

/** Sets every figure in a sentence in Num, so the digits line up with the rest of the system. */
function withFigures(text: string): ReactNode {
  return text.split(/(\d+(?:\.\d+)?)/).map((part, i) => (i % 2 === 1 ? <Num key={i}>{part}</Num> : part));
}

function lineName({ line }: BrandPick): ReactNode {
  return line.code === undefined ? (
    line.name
  ) : (
    <>
      <Code>{line.code}</Code> {line.name}
    </>
  );
}

function BrandCard({ group, first }: { group: BrandGroup; first: boolean }) {
  const { brand, picks } = group;
  const actions = first ? (
    <Badge variant="success" icon="check">
      Start here
    </Badge>
  ) : undefined;
  return (
    <Card as="li" title={`${brand.name}, ${brand.origin}`} titleAs="h3" actions={actions}>
      <Prose>
        <p>{withFigures(brand.knownFor)}</p>
        {picks.map((pick) => (
          <Fragment key={pick.line.id}>
            <h4>{lineName(pick)}</h4>
            <p>{withFigures(pick.why)}</p>
          </Fragment>
        ))}
      </Prose>
    </Card>
  );
}

export function Lineup() {
  const [shopId, setShopId] = useState<string | null>(null);
  const [floor, setFloor] = useState<FloorId>("both");

  const shop = SHOP_KINDS.find((s) => s.id === shopId);
  const lineup = shop === undefined ? undefined : lineupFor(shop, floor);
  const floorWords = FLOORS.find((f) => f.value === floor)?.label.toLowerCase() ?? "";

  return (
    <Stack>
      <Prose>
        <h1>The Livetools brands for your shop</h1>
        <p>
          Setting up a new machine shop? Tell us what sort of work you do and what is on your floor, and we will
          introduce the brands and product lines to start with.
        </p>
      </Prose>

      <Form onSubmit={() => undefined}>
        <Stack>
          <RadioGroup
            label="What sort of shop are you?"
            name="shop"
            layout="cards"
            items={SHOP_ITEMS}
            value={shopId}
            onValueChange={setShopId}
          />
          <RadioGroup
            label="What is on your floor?"
            name="floor"
            layout="buttons"
            items={FLOOR_ITEMS}
            value={floor}
            onValueChange={(v) => setFloor(v as FloorId)}
          />
        </Stack>
      </Form>

      {shop !== undefined && lineup !== undefined && (
        <>
          <Divider />
          <Prose>
            <h2>Your starting line-up</h2>
            <p>{withFigures(shop.summary)}</p>
          </Prose>
          {lineup.groups.length === 0 ? (
            <Empty title={`Nothing in this line-up for ${floorWords} alone`}>
              <Prose>
                <p>The tools for this kind of shop run on other machines. Pick what else is on your floor to see them.</p>
              </Prose>
            </Empty>
          ) : (
            <Stack as="ul">
              {lineup.groups.map((group, i) => (
                <BrandCard key={group.brand.id} group={group} first={i === 0} />
              ))}
            </Stack>
          )}
          {lineup.others.length > 0 && (
            <Prose>
              <h2>Also in the Livetools line-up</h2>
              <ul>
                {lineup.others.map((brand) => (
                  <li key={brand.id}>
                    <strong>
                      {brand.name}, {brand.origin}.
                    </strong>{" "}
                    {withFigures(brand.knownFor)}
                  </li>
                ))}
              </ul>
            </Prose>
          )}
        </>
      )}
    </Stack>
  );
}
