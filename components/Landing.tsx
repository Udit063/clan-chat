import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users, Shield } from "lucide-react";
import { ReactElement } from "react";

export default function Landing() {
  return (
    <div className="flex flex-col text-white">
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Unite Your Clan, Chat with Ease
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-gray-300">
          Clan Chat brings every community together. Seamless communication,
          powerful organization, and a touch of fun – all in one place.
        </p>
        <Button
          asChild
          className="bg-[#7289da] hover:bg-[#5b6eae] text-white font-semibold py-2 px-6 rounded-full text-lg"
        >
          <Link href="/login">
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </Button>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageCircle size={40} />}
            title="Real-time Chat"
            description="Instant messaging with your clan members, complete with rich media support."
          />
          <FeatureCard
            icon={<Users size={40} />}
            title="Clan Management"
            description="Organize your clan with roles, channels, and custom permissions."
          />
          <FeatureCard
            icon={<Shield size={40} />}
            title="Secure & Private"
            description="End-to-end encryption and robust privacy controls to keep your conversations safe."
          />
        </div>
      </main>

      <footer className="container mx-auto px-4 pb-6 text-center text-gray-400">
        <p>&copy; 2024 Clan Chat. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactElement;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#2f3136] p-6 rounded-lg">
      <div className="text-[#7289da]">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
