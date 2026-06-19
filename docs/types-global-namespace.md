## Types Global Namespace

We designed a cross-cutting  global project namespace to be easily reused across the project as a module encapsulating all the types in the application. I leveraged the inversion of control principle, so instead of defining all the types in one place (in the Types module), it's the responsibility of modules (which are owners of that particular type annotations) to extend the  namespace.

The main benefits are:
- simplicity to extend
- easy maintenance - for instance when you remove some application module you also delete the extension point because it's colocated with the module
- nicely and cleanly imported in type consumers



