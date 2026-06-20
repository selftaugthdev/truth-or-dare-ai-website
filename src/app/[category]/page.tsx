import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppStoreBadge from "@/components/AppStoreBadge";
import QuestionCard from "@/components/QuestionCard";
import { CATEGORIES, getCategory } from "@/lib/site-config";
import { CATEGORY_CONTENT } from "@/lib/category-content";
import { getCategoryQuestions, type CategoryQuestion } from "@/lib/questions";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

type CategoryPageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const content = CATEGORY_CONTENT[category];
  if (!content) return {};
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const content = CATEGORY_CONTENT[slug];
  if (!content) notFound();

  const category = getCategory(slug);
  const questions = getCategoryQuestions(slug);

  return (
    <div className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-4xl">{category.emoji}</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-white sm:text-5xl">{category.title}</h1>
        <p className="mt-5 text-white/70">{content.intro}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((question) => (
          <QuestionCardFor key={question.id} question={question} />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-xl text-center">
        <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
          That&apos;s the free list. The app never runs dry.
        </h2>
        <p className="mt-3 text-white/60">
          Get unlimited AI-generated questions, every mode, and multiplayer for up to 20 people.
        </p>
        <div className="mt-6 flex justify-center">
          <AppStoreBadge size="lg" />
        </div>
      </div>
    </div>
  );
}

function QuestionCardFor({ question }: { question: CategoryQuestion }) {
  if (question.kind === "would-you-rather") {
    return <QuestionCard mode="would-you-rather" optionA={question.optionA} optionB={question.optionB} intensity={question.intensity} />;
  }
  if (question.kind === "never-have-i-ever") {
    return <QuestionCard mode="never-have-i-ever" text={question.text} intensity={question.intensity} />;
  }
  return <QuestionCard mode={question.type} text={question.text} intensity={question.intensity} />;
}
