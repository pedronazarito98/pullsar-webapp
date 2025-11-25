"use client";
import { ArticlePage } from "@/components/ArticlePage";
import { CategoryPage } from "@/components/CategoryPage";
import { HomePage } from "@/components/HomePage";
import { useState } from "react";

type Page = "home" | "category" | "article";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<string>("");

  const navigateToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage("category");
    window.scrollTo(0, 0);
  };

  const navigateToArticle = (articleId: string) => {
    setSelectedArticle(articleId);
    setCurrentPage("article");
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === "home" && (
        <HomePage
          onNavigateToCategory={navigateToCategory}
          onNavigateToArticle={navigateToArticle}
        />
      )}
      {currentPage === "category" && (
        <CategoryPage
          categoryId={selectedCategory}
          onNavigateToArticle={navigateToArticle}
          onNavigateToHome={navigateToHome}
        />
      )}
      {currentPage === "article" && (
        <ArticlePage
          articleId={selectedArticle}
          onNavigateToHome={navigateToHome}
          onNavigateToCategory={navigateToCategory}
        />
      )}
    </div>
  );
}
