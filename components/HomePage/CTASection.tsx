"use client";

import Link from "next/link";

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Note-Taking?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of users who are already making their conversations
          more productive and their notes more intelligent with Note Recall.
        </p>
        <Link
          href="/auth"
          className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all duration-200 text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          Get Started for Free
        </Link>
      </div>
    </section>
  );
}
