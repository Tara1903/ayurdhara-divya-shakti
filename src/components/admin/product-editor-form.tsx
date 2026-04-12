"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import {
  deleteProductAction,
  saveProductAction,
  type AdminActionState,
} from "@/app/actions/admin";
import { Button, buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

const initialState: AdminActionState = {};

const categories = [
  { value: "Purush Shakti", label: "Purush Shakti" },
  { value: "Stree Arogya", label: "Stree Arogya" },
  { value: "Bal Sanrakshan", label: "Bal Sanrakshan" },
  { value: "Vriddha Seva", label: "Vriddha Seva" },
  { value: "Parivar Swasthya", label: "Parivar Swasthya" },
  { value: "Ayur Therapy", label: "Ayur Therapy" },
  { value: "Immunity", label: "Immunity" },
  { value: "Hair Care", label: "Hair Care" },
  { value: "Skin Care", label: "Skin Care" },
  { value: "Digestion", label: "Digestion" },
  { value: "Energy", label: "Energy" },
  { value: "Nabhi Oils", label: "Nabhi Oils" },
  { value: "Feet Oils", label: "Feet Oils" },
  { value: "Nasal Oils", label: "Nasal Oils" },
  { value: "Hair Oils", label: "Hair Oils" },
  { value: "Body Oils", label: "Body Oils" },
  { value: "Roots", label: "Roots" },
  { value: "Leaves", label: "Leaves" },
  { value: "Fruits", label: "Fruits" },
  { value: "Seeds", label: "Seeds" },
  { value: "Bark", label: "Bark" },
  { value: "Flowers", label: "Flowers" },
  { value: "Hair Combo", label: "Hair Combo" },
  { value: "Skin Combo", label: "Skin Combo" },
  { value: "Immunity Combo", label: "Immunity Combo" },
  { value: "Weight Loss Combo", label: "Weight Loss Combo" },
  { value: "Family Combo", label: "Family Combo" },
] as const;

function joinLines(values?: string[]) {
  return values?.join("\n") ?? "";
}

function joinPairs(values?: Array<{ name: string; purpose: string }>) {
  return values?.map((value) => `${value.name} | ${value.purpose}`).join("\n") ?? "";
}

function joinFaqs(values?: Array<{ question: string; answer: string }>) {
  return values?.map((value) => `${value.question} | ${value.answer}`).join("\n") ?? "";
}

export function ProductEditorForm({ product }: { product?: Product }) {
  const [state, action, pending] = useActionState(saveProductAction, initialState);
  const isNew = !product;

  return (
    <section className="section-frame overflow-hidden">
      <div className="border-b border-[var(--color-line)] px-6 py-5 md:px-8">
        <p className="eyebrow">{isNew ? "New Product" : "Product Editor"}</p>
        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif-display text-3xl text-[var(--color-ink)]">
              {product?.name ?? "Create a new wellness product"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
              Use one line per bullet item. For “What&apos;s inside” and FAQ rows,
              separate each pair with a <code>|</code>.
            </p>
          </div>

          {!isNew && product ? (
            <form action={deleteProductAction}>
              <input type="hidden" name="id" value={product.id} />
              <button
                type="submit"
                className={buttonStyles({ variant: "secondary" })}
              >
                Delete Product
              </button>
            </form>
          ) : null}
        </div>
      </div>

      <form action={action} className="grid gap-6 px-6 py-6 md:px-8 md:py-8">
        <input type="hidden" name="id" defaultValue={product?.id ?? ""} />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name">
            <input
              name="name"
              required
              defaultValue={product?.name ?? ""}
              placeholder="Purush Shakti 9-in-1 Wellness Kit"
            />
          </Field>
          <Field label="Slug">
            <input
              name="slug"
              defaultValue={product?.slug ?? ""}
              placeholder="purush-shakti-9-in-1-wellness-kit"
            />
          </Field>
          <Field label="Category">
            <select
              name="category"
              defaultValue={product?.category ?? "Parivar Swasthya"}
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Image URL">
            <input
              name="image"
              defaultValue={product?.image ?? ""}
              placeholder="https://images.unsplash.com/..."
            />
          </Field>
          <Field label="Offer Price">
            <input
              name="price"
              type="number"
              min={0}
              defaultValue={product?.price ?? 2499}
            />
          </Field>
          <Field label="Original Price">
            <input
              name="originalPrice"
              type="number"
              min={0}
              defaultValue={product?.originalPrice ?? 2699}
            />
          </Field>
          <Field label="Duration Label" className="md:col-span-2">
            <input
              name="durationLabel"
              defaultValue={product?.durationLabel ?? "30-45 day guided wellness routine"}
              placeholder="30-45 day guided wellness routine"
            />
          </Field>
          <Field label="Short Benefit" className="md:col-span-2">
            <textarea
              name="shortBenefit"
              rows={3}
              defaultValue={product?.shortBenefit ?? ""}
              placeholder="Complete body balance for sleep, digestion, stress, and vitality."
            />
          </Field>
          <Field label="Description" className="md:col-span-2">
            <textarea
              name="description"
              rows={5}
              defaultValue={product?.description ?? ""}
              placeholder="Describe the kit and the lifestyle concern it addresses."
            />
          </Field>
          <Field label="Problem It Solves" className="md:col-span-2">
            <textarea
              name="problemStatement"
              rows={4}
              defaultValue={product?.problemStatement ?? ""}
              placeholder="What body or lifestyle issues make this product useful?"
            />
          </Field>
          <Field label="Benefits" className="md:col-span-2">
            <textarea
              name="benefits"
              rows={6}
              defaultValue={joinLines(product?.benefits)}
              placeholder="One benefit per line"
            />
          </Field>
          <Field label="Ingredient Feel" className="md:col-span-2">
            <textarea
              name="ingredientsFeel"
              rows={5}
              defaultValue={joinLines(product?.ingredientsFeel)}
              placeholder="One ingredient note per line"
            />
          </Field>
          <Field label="How To Use" className="md:col-span-2">
            <textarea
              name="usageMethod"
              rows={5}
              defaultValue={joinLines(product?.usageMethod)}
              placeholder="One usage step per line"
            />
          </Field>
          <Field label="Who Should Use" className="md:col-span-2">
            <textarea
              name="whoShouldUse"
              rows={5}
              defaultValue={joinLines(product?.whoShouldUse)}
              placeholder="One audience line per row"
            />
          </Field>
          <Field label="Expected Timeline" className="md:col-span-2">
            <textarea
              name="expectedTimeline"
              rows={5}
              defaultValue={joinLines(product?.expectedTimeline)}
              placeholder="Days 1-7: ... "
            />
          </Field>
          <Field label="What's Inside" className="md:col-span-2">
            <textarea
              name="whatsInside"
              rows={7}
              defaultValue={joinPairs(product?.whatsInside)}
              placeholder="Digest Ease Oil | Supports digestion and abdominal comfort"
            />
          </Field>
          <Field label="FAQs" className="md:col-span-2">
            <textarea
              name="faqs"
              rows={6}
              defaultValue={joinFaqs(product?.faqs)}
              placeholder="Can I use this daily? | Yes, consistent daily use is recommended."
            />
          </Field>
        </div>

        {state.error ? (
          <p className="rounded-[20px] bg-[#fff0eb] px-4 py-3 text-sm text-[#9c4b35]">
            {state.error}
          </p>
        ) : null}
        {state.success ? (
          <p className="rounded-[20px] bg-[#eff8ee] px-4 py-3 text-sm text-[var(--color-forest)]">
            {state.success}
          </p>
        ) : null}

        <div className="flex justify-end">
          <Button type="submit" disabled={pending}>
            {pending ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("grid gap-2 text-sm font-medium text-[var(--color-ink)]", className)}>
      <span>{label}</span>
      <div className="[&>input]:w-full [&>input]:rounded-[22px] [&>input]:border [&>input]:border-[var(--color-line)] [&>input]:bg-[var(--color-surface)] [&>input]:px-4 [&>input]:py-3 [&>input]:outline-none [&>select]:w-full [&>select]:rounded-[22px] [&>select]:border [&>select]:border-[var(--color-line)] [&>select]:bg-[var(--color-surface)] [&>select]:px-4 [&>select]:py-3 [&>select]:outline-none [&>textarea]:w-full [&>textarea]:rounded-[24px] [&>textarea]:border [&>textarea]:border-[var(--color-line)] [&>textarea]:bg-[var(--color-surface)] [&>textarea]:px-4 [&>textarea]:py-3 [&>textarea]:outline-none">
        {children}
      </div>
    </label>
  );
}
