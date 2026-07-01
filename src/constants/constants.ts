import { Dimensions } from 'react-native';

export const DURATION = {
  MS_250: 250,
  MS_500: 500,
  MS_1000: 1000,
  MS_1500: 1500,
  MS_2000: 2000,
  MS_10000: 10000,
};

export const SQUARE_SIZE = 120;
export const CIRCLE_RADIUS = 30;
export const BOTTOM_TAB_BAR_HEIGHT = 65;

export const { width: ScreenWidth, height: ScreenHeight } =
  Dimensions.get('window');

export const CAROUSEL_IMAGES = [
  'https://images.unsplash.com/photo-1712174863129-dcbd52938915?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1621897100070-055b183ead92?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1623093386041-a0915e5a1ca4?q=100&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1513883524931-aaab83bcb19b?q=100&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

export const SECTIONS = [
  {
    title: 'Introduction',
    description:
      'Programming languages are the foundation of modern software development. They provide developers with different ways to solve problems, build applications, and communicate instructions to computers. Each language is designed with specific goals and trade-offs in mind.',
  },
  {
    title: 'JavaScript',
    description:
      'JavaScript is the language of the web and is supported by all modern browsers. It enables interactive user experiences, dynamic content updates, and real-time communication. With technologies like Node.js, JavaScript is also widely used for backend development.',
  },
  {
    title: 'Python',
    description:
      'Python is known for its clean syntax and ease of learning, making it popular among beginners and professionals alike. It has a rich ecosystem of libraries for data analysis, machine learning, web development, and automation. Its versatility has made it one of the most widely adopted programming languages in the world.',
  },
  {
    title: 'TypeScript',
    description:
      'TypeScript extends JavaScript by adding static typing and powerful development tools. It helps teams catch errors earlier in the development process and improve code maintainability. Many large-scale web applications use TypeScript to increase reliability and developer productivity.',
  },
  {
    title: 'Java',
    description:
      'Java is a mature, object-oriented language used by enterprises worldwide. Its platform independence allows applications to run on different operating systems without major modifications. Java remains a popular choice for backend services, Android applications, and large business systems.',
  },
  {
    title: 'C++',
    description:
      'C++ provides low-level control over system resources while supporting modern programming techniques. It is commonly used in game engines, embedded systems, financial software, and operating systems. Developers choose C++ when performance and efficiency are critical requirements.',
  },
  {
    title: 'C#',
    description:
      'C# is a modern language developed by Microsoft and is closely integrated with the .NET ecosystem. It is widely used for desktop software, web applications, cloud services, and game development through Unity. Its strong tooling and developer experience make it a favorite among many professionals.',
  },
  {
    title: 'Go',
    description:
      'Go was designed by Google to simplify concurrent and distributed programming. It offers fast compilation times, a straightforward syntax, and excellent performance. Go has become a popular choice for cloud infrastructure, APIs, and scalable backend systems.',
  },
  {
    title: 'Rust',
    description:
      'Rust focuses on memory safety and performance without relying on garbage collection. Its unique ownership system helps developers prevent many common programming errors at compile time. Rust is increasingly used for systems programming, web services, and performance-sensitive applications.',
  },
  {
    title: 'Swift',
    description:
      'Swift is Apple’s modern programming language for building applications across its ecosystem. It combines safety, performance, and expressive syntax to create a productive development experience. Swift is the primary language used for iOS and macOS application development.',
  },
  {
    title: 'Kotlin',
    description:
      'Kotlin is a concise and expressive language that runs on the Java Virtual Machine. It reduces boilerplate code and introduces modern language features while maintaining interoperability with Java. Google officially recommends Kotlin for Android development.',
  },
  {
    title: 'PHP',
    description:
      'PHP is a server-side scripting language that powers a large portion of the internet. It is especially popular for content management systems and dynamic websites. Despite being one of the older web technologies, PHP continues to evolve and remains widely used.',
  },
  {
    title: 'Ruby',
    description:
      'Ruby emphasizes developer happiness through its elegant and readable syntax. It became especially popular with the Ruby on Rails framework, which simplified web application development. Ruby is appreciated for its productivity and strong community support.',
  },
  {
    title: 'Dart',
    description:
      'Dart is a language developed by Google and is best known for powering Flutter applications. It enables developers to build high-performance apps for mobile, web, desktop, and embedded devices from a single codebase. Dart combines ease of use with efficient compilation and execution.',
  },
  {
    title: 'Elixir',
    description:
      'Elixir is a functional programming language built on the Erlang virtual machine. It is designed for highly scalable and fault-tolerant systems, making it ideal for real-time applications and distributed services. Developers often choose Elixir for systems that require high availability and reliability.',
  },
];

export const BUTTON_ITEMS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  'C',
  0,
  'backspace',
] as const;

export const SEGMENTED_CONTROL_OPTIONS = ['Light', 'Standard', 'Pro'];

export const LIGHT_GRAPH_SCORES = [
  100, 53, 82, 59, 43, 63, 51, 66, 54, 62, 72, 81, 89, 100, 100, 100, 96, 98,
  100, 100, 100, 100, 100, 93, 97, 100, 100,
];
export const STANDARD_GRAPH_SCORES = [
  84, 42, 67, 48, 35, 54, 43, 57, 47, 53, 61, 68, 77, 85, 87, 93, 82, 84, 88,
  87, 95, 91, 90, 77, 82, 87, 92,
];
export const PRO_GRAPH_SCORES = [
  70, 35, 55, 39, 29, 46, 37, 50, 40, 45, 51, 57, 65, 73, 74, 80, 71, 71, 75,
  73, 79, 75, 74, 63, 69, 74, 79,
];

export const SCREEN_NAMES = {
  Home: 'Home',
  Bookmark: 'Bookmark',
  Add: 'Add',
  Profile: 'Profile',
  Settings: 'Settings',
} as const;
