import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Seamless Integration",
    description:
      "Effortlessly integrate our AI content generator with your existing workflow. Our APIs and tools are designed to make content creation a breeze.",
    href: "/login",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Enhanced Security",
    description:
      "Your data's security is our top priority. Our platform uses state-of-the-art encryption and security protocols to ensure your information is safe.",
    href: "/login",
    icon: LockClosedIcon,
  },
  {
    name: "Reliable Performance",
    description:
      "Experience unmatched performance with our AI. Our robust infrastructure ensures that your content is generated quickly and accurately, every time.",
    href: "/login",
    icon: ArrowPathIcon,
  },
];

export default function AppFeatures() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            AI-Powered Content Creation
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transform Your Content Strategy
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Leverage the power of AI to create high-quality, engaging content
            for your audience. Whether you need articles, blog posts, or any other type of content, our platform delivers.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-400"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a
                      href={feature.href}
                      className="text-sm font-semibold leading-6 text-indigo-400"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
