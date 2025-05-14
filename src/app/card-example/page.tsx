"use client";

import React from "react";
import Card from "@/components/ui/Card";
import CardGrid from "@/components/ui/CardGrid";
import { Button } from "@/components/ui/Button";

export default function CardExamplePage() {
  const handleClick = () => alert("Card diklik!");

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-heading font-bold">
        🧩 Card Component Showcase
      </h1>

      {/* ✅ VARIAN STYLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">
          🧱 Card Variants
        </h2>
        <CardGrid columns={{ sm: 1, md: 2, lg: 4 }} gap="medium">
          <Card
            title="Default"
            subtitle="Card dengan shadow normal"
            content="Ini adalah varian default."
            variant="default"
          />
          <Card
            title="Elevated"
            subtitle="Card dengan shadow lebih besar"
            content="Cocok untuk highlight item penting."
            variant="elevated"
          />
          <Card
            title="Bordered"
            subtitle="Card dengan border"
            content="Berguna untuk struktur data formal."
            variant="bordered"
          />
          <Card
            title="Simple"
            subtitle="Tanpa background dan border"
            content="Untuk kebutuhan minimalis."
            variant="simple"
          />
        </CardGrid>
      </section>

      {/* ✅ CARD DENGAN DAN TANPA GAMBAR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">
          🖼 Card with or without Image
        </h2>
        <CardGrid columns={{ sm: 1, md: 2 }} gap="medium">
          <Card
            title="Dengan Gambar"
            subtitle="Thumbnail di atas"
            content="Ideal untuk artikel, kegiatan, atau galeri."
            imageUrl="/images/magang.jpg"
            variant="default"
          />
          <Card
            title="Tanpa Gambar"
            subtitle="Tampilan lebih padat"
            content="Gunakan ini untuk teks pendek atau dashboard info."
            variant="default"
          />
        </CardGrid>
      </section>

      {/* ✅ CARD DENGAN FOOTER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">
          🔘 Card dengan Footer
        </h2>
        <CardGrid columns={{ sm: 1, md: 2 }} gap="medium">
          <Card
            title="Dengan Footer"
            content="Ada tombol aksi di bawah card."
            variant="elevated"
            footer={
              <Button size="sm" variant="outline">
                Lihat
              </Button>
            }
          />
          <Card
            title="Tanpa Footer"
            content="Lebih simple tanpa tombol bawah."
            variant="elevated"
          />
        </CardGrid>
      </section>

      {/* ✅ CARD CLICKABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">
          🖱 Clickable Card
        </h2>
        <CardGrid columns={{ sm: 1, md: 2 }} gap="medium">
          <Card
            title="Link Card"
            content="Klik untuk navigate ke halaman lain."
            href="/dashboard"
            variant="bordered"
          />
          <Card
            title="Clickable Function"
            content="Klik card akan trigger aksi (alert)."
            onClick={handleClick}
            variant="bordered"
          />
        </CardGrid>
      </section>

      {/* ✅ NON-HOVER CARD */}
      <section className="space-y-4">
        <h2 className="text-2xl font-heading font-semibold">
          🛑 Non-hover Card
        </h2>
        <CardGrid columns={{ sm: 1, md: 2 }} gap="medium">
          <Card
            title="Tanpa Hover Effect"
            content="Tidak ada animasi saat hover."
            hoverEffect={false}
            variant="default"
          />
          <Card
            title="Dengan Hover"
            content="Ada animasi bayangan & geser naik."
            hoverEffect={true}
            variant="default"
          />
        </CardGrid>
      </section>
    </div>
  );
}
