import { Button } from '../component/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../component/ui/card';
import { GraduationCap, BookOpen, Users, BarChart3, CalendarDays, ClipboardClock, SquareLibrary, BookCheck} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser} from '../Authentic/AuthProvider';

export function Landing() {
  function AuthLink() {
    const user = getCurrentUser();

    if (user) {
      return (
        <Link to={`/${user.role}/dashboard`} >
          <Button size="lg" variant="secondary" className="gap-2 text-base px-8 shadow-elevated bg-secondary-500">
            <BookCheck className="w-5 h-5" />
            Get Started
          </Button>
        </Link>
      );
    } else {
      return (
        <Link to={`/login`} >
          <Button size="lg" variant="secondary" className="gap-2 text-base px-8 shadow-elevated">
            <BookCheck className="w-5 h-5" />
            Get Started
          </Button>
        </Link>
      );
    }
  }
  const roles = [
    {
      title: 'Student',
      description: 'Search and enroll in tutoring classes, access learning materials, and track your progress',
      icon: GraduationCap,
      link: '/student/dashboard',
      gradient: 'from-primary to-secondary',
    },
    {
      title: 'Tutor',
      description: 'Create and manage classes, track student progress, and share resources with your students',
      icon: BookOpen,
      link: '/tutor/dashboard',
      gradient: 'from-secondary to-accent',
    },
    {
      title: 'Administrator',
      description: 'Monitor program activities, generate reports, and oversee tutor and student performance',
      icon: BarChart3,
      link: '/admin/dashboard',
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* intro Section */}
        <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden bg-gradient-to-r from-primary via-primary-500 via-primary-300 to-[#0baaa5] ">
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <img className="w-5 h-5 text-white" src='/logo-hcmut.png' />
                </div>
                <span className="text-white font-medium">HCMUT Tutor Support System</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Academic Excellence Through Collaborative Learning
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Connect with expert tutors, access quality learning resources, and track your academic progress
                in one integrated platform
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {AuthLink()}
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <Users className="w-5 h-5" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* role Selection */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Role
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Select your role to access personalized features and tools designed for your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {roles.map((role) => {
                const Icon = role.icon;
                  return (
                    <Link key={role.title} to={role.link}>
                      <Card className="group hover:shadow-card-hover transition-all duration-300 cursor-pointer h-full">
                        <CardHeader>
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {role.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {role.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white hover:bg-primary transition-colors">
                            Access {role.title} Portal
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Key Features
              </h2>
              <p className="text-lg text-gradient-700 max-w-2xl mx-auto">
                Everything you need for effective academic support and mentoring
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Class Management', desc: 'Create and organize tutoring classes with ease', icon: BookOpen },
                { title: 'Smart Scheduling', desc: 'Flexible session scheduling with conflict detection', icon: CalendarDays },
                { title: 'Learning Hub', desc: 'Share materials and collaborate with peers', icon: SquareLibrary },
                { title: 'Progress Tracking', desc: 'Monitor attendance and academic performance', icon: ClipboardClock },
              ].map((feature, idx) => (
                <Card key={idx} className="text-center hover:shadow-card transition-shadow">
                  <CardHeader>
                    <div className="text-4xl mb-3 mx-auto">{typeof feature.icon === 'string' ? feature.icon : <feature.icon className="w-10 h-10 mx-auto text-primary" />}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};