import { NextResponse } from 'next/server';

export async function GET() {
  const services = [
    {
      id: 'service-web-design',
      title: 'Web Design',
      description: 'We construct visually stunning, user-centric interfaces. From wireframes to premium visual design systems, we craft websites that capture your brand essence and convert visitors.',
      icon: 'Palette',
    },
    {
      id: 'service-frontend-dev',
      title: 'Front-End Development',
      description: 'Pixel-perfect implementations using modern web technologies. We construct lightning-fast, accessible, and responsive client-side architectures that scale seamlessly.',
      icon: 'Code',
    },
    {
      id: 'service-branding',
      title: 'Branding',
      description: 'Complete brand strategies, typography guidelines, and logo design systems. We help define your identity and create memorable, cohesive brand experiences across channels.',
      icon: 'Sparkles',
    },
  ];

  return NextResponse.json(services);
}
