import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const computerScienceSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET Computer Science and Applications (Code 87) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const computerScienceSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit 1: Discrete Structures and Optimization',
    topics: [
      {
        name: 'Mathematical Logic, Sets, Relations and Functions',
        subtopics: [
          { name: 'Propositional Logic: Propositional Equivalences, Tautology, Contradiction, Predicates and Quantifiers (Universal, Existential), Rules of Inference' },
          { name: 'Set Theory: Set Operations, Inclusion-Exclusion Principle, Venn Diagrams' },
          { name: 'Relations: Equivalence Relations, Partial Order Relations (Poset, Hasse Diagrams, Lattices: Distributive, Modular, Complete, Bounded, Complemented Lattices)' },
          { name: 'Functions: Injective, Surjective, Bijective Functions, Composition of Functions, Pigeonhole Principle' },
        ],
      },
      {
        name: 'Group Theory, Combinatorics and Recurrence Relations',
        subtopics: [
          { name: 'Algebraic Structures: Semi-groups, Monoids, Groups, Abelian Groups, Subgroups, Cosets, Lagrange’s Theorem, Normal Subgroups, Homomorphism and Isomorphism of Groups, Rings and Fields' },
          { name: 'Combinatorics: Permutations and Combinations, Counting Principles, Generating Functions' },
          { name: 'Recurrence Relations: Solving Linear Recurrence Relations (Homogeneous and Non-Homogeneous), Characteristic Equation Method, Master Theorem' },
        ],
      },
      {
        name: 'Graph Theory',
        subtopics: [
          { name: 'Graph Fundamentals: Graphs, Subgraphs, Degree of Vertices (Handshaking Lemma), Paths, Cycles, Bipartite Graphs, Complete Graphs' },
          { name: 'Trees: Spanning Trees, Minimum Spanning Trees (Kruskal, Prim algorithms), Binary Trees, Tree Traversals' },
          { name: 'Eulerian Graphs (Euler Path & Circuit) vs Hamiltonian Graphs (Dirac & Ore Theorems)' },
          { name: 'Planar Graphs: Euler’s Formula (V - E + R = 2), Kuratowski’s Theorem (K5 and K3,3), Graph Coloring (Chromatic Number, Four Color Theorem)' },
        ],
      },
      {
        name: 'Linear Programming and Optimization',
        subtopics: [
          { name: 'Linear Programming Problem (LPP): Mathematical Formulation, Graphical Method' },
          { name: 'Simplex Method: Slack, Surplus, Artificial Variables, Big-M Method, Two-Phase Simplex Method, Degeneracy and Cycling' },
          { name: 'Duality in LPP: Dual Formulation, Duality Theorems (Fundamental, Weak, Strong Duality)' },
          { name: 'Transportation Model (VAM, MODI / u-v method) and Assignment Model (Hungarian Algorithm)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit 2: Computer System Architecture',
    topics: [
      {
        name: 'Digital Logic Circuits, Boolean Algebra and Data Representation',
        subtopics: [
          { name: 'Boolean Algebra: Boolean Functions, Canonical and Standard Forms (SOP, POS), Karnaugh Maps (K-Maps up to 5 variables, Don’t-Care Conditions), Quine-McCluskey Minimization' },
          { name: 'Combinational Logic Circuits: Adders, Subtractors, Encoders, Decoders, Multiplexers (MUX), Demultiplexers (DEMUX), PLDs (PLA, PAL, CPLD, FPGA)' },
          { name: 'Sequential Logic Circuits: Flip-Flops (SR, JK, D, T Flip-Flops, Master-Slave JK Flip-Flop, Race-Around Condition), Registers, Shift Registers, Synchronous and Asynchronous Counters' },
          { name: 'Data Representation: Signed and Unsigned Numbers, 1’s and 2’s Complement Arithmetic, IEEE 754 Floating-Point Standard (Single & Double Precision)' },
        ],
      },
      {
        name: 'Register Transfer, Micro-Operations and Central Processing Unit',
        subtopics: [
          { name: 'Register Transfer Language (RTL), Bus and Memory Transfers, Three-State Bus Buffers' },
          { name: 'Micro-Operations: Arithmetic, Logic, and Shift Micro-operations' },
          { name: 'Instruction Formats: Zero, One, Two, Three-Address Instructions, Addressing Modes (Direct, Indirect, Immediate, Register, Indexed, Relative, Base Register)' },
          { name: 'Control Unit Design: Hardwired Control vs Microprogrammed Control (Horizontal vs Vertical Micro-instructions, Micro-program Sequencer)' },
          { name: 'CISC (Complex Instruction Set Computer) vs RISC (Reduced Instruction Set Computer) Architecture' },
        ],
      },
      {
        name: 'Memory Hierarchy, Pipelining and Multiprocessors',
        subtopics: [
          { name: 'Memory Hierarchy: Main Memory (RAM, ROM), Cache Memory (Direct, Associative, Set-Associative Mapping, Cache Misses: Cold, Conflict, Capacity, Replacement Algorithms: LRU, FIFO, Write Policies: Write-Through vs Write-Back), Virtual Memory (Paging, TLB, Page Faults)' },
          { name: 'Pipelining: Arithmetic Pipeline, Instruction Pipeline, Pipeline Hazards (Structural, Data: RAW, WAR, WAW, Control Hazards / Branching, Hazard Mitigation: Forwarding, Branch Prediction), Speedup and Throughput' },
          { name: 'Parallel and Vector Processing: Flynn’s Classification (SISD, SIMD, MISD, MIMD), Vector Processors, Array Processors, Cache Coherence Protocols (MESI Protocol), Interconnection Networks' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit 3: Programming Languages and Computer Graphics',
    topics: [
      {
        name: 'Language Design, Syntax, Semantics and Storage Management',
        subtopics: [
          { name: 'Programming Paradigms: Imperative, Object-Oriented, Functional, Logic Programming' },
          { name: 'Syntax Specification: Context-Free Grammars (CFG), BNF, EBNF, Parse Trees, Ambiguity' },
          { name: 'Storage Allocation: Static, Stack-Based (Activation Records / Call Stack, Dynamic Links, Static Links), Heap-Based Storage, Garbage Collection (Mark and Sweep, Reference Counting)' },
          { name: 'Parameter Passing Mechanisms: Call by Value, Call by Reference, Call by Value-Result, Call by Name (Thunks)' },
        ],
      },
      {
        name: 'Object-Oriented Programming (OOP) in C++ and Java',
        subtopics: [
          { name: 'Core OOP Principles: Encapsulation, Data Abstraction, Inheritance (Single, Multiple, Multilevel, Hierarchical, Diamond Problem), Polymorphism (Compile-Time: Function/Operator Overloading vs Run-Time: Virtual Functions, VTABLE/VPTR)' },
          { name: 'Constructors, Destructors, Copy Constructors, Friend Functions, Templates (Generic Programming), Exception Handling' },
          { name: 'Java Programming: JVM, Bytecode, Garbage Collection, Multithreading, Interfaces, Abstract Classes' },
        ],
      },
      {
        name: 'Computer Graphics and 2D / 3D Transformations',
        subtopics: [
          { name: 'Display Devices: CRT, Refresh CRT, Raster Scan vs Random Scan Systems, Video Controller, Frame Buffer' },
          { name: 'Line and Circle Drawing Algorithms: DDA Line Algorithm, Bresenham’s Line Algorithm, Midpoint Circle Algorithm' },
          { name: '2D Transformations: Translation, Scaling, Rotation, Reflection, Shearing using 3x3 Homogeneous Coordinates' },
          { name: '2D Clipping Algorithms: Cohen-Sutherland Line Clipping Algorithm (Outcodes), Liang-Barsky Line Clipping, Sutherland-Hodgman Polygon Clipping Algorithm' },
          { name: '3D Graphics: 3D Transformations, Projections (Parallel: Orthographic, Oblique vs Perspective Projection), Hidden Surface Removal Algorithms (Z-Buffer Algorithm, Painter’s Algorithm / Depth-Sort, Scan-Line Algorithm), Shading Models (Flat, Gouraud, Phong Shading)' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit 4: Database Management Systems',
    topics: [
      {
        name: 'Database Architecture, E-R Modeling and Relational Model',
        subtopics: [
          { name: 'Database Architecture: Three-Schema Architecture (Physical, Logical, External Levels), Data Independence (Physical vs Logical)' },
          { name: 'Entity-Relationship (E-R) Model: Entities, Attributes (Composite, Multivalued, Derived), Relationships (Cardinality Ratios, Participation Constraints), Extended E-R (Specialization, Generalization, Aggregation)' },
          { name: 'Relational Model Concepts: Relations, Tuples, Attributes, Domains, Relational Integrity Constraints (Entity Integrity, Referential Integrity / Foreign Keys), Relational Algebra Operations (Select, Project, Union, Set Difference, Cartesian Product, Joins: Natural, Theta, Equi, Outer Joins), Tuple Relational Calculus (TRC) and Domain Relational Calculus (DRC)' },
        ],
      },
      {
        name: 'SQL (Structured Query Language) and Relational Database Design',
        subtopics: [
          { name: 'SQL Syntax: DDL (CREATE, ALTER, DROP), DML (INSERT, UPDATE, DELETE), DQL (SELECT with GROUP BY, HAVING, ORDER BY), Aggregate Functions, Nested Subqueries, Correlated Subqueries, Views, Triggers, Assertions' },
          { name: 'Functional Dependencies: Armstrong’s Axioms (Reflexivity, Augmentation, Transitivity), Closure of Functional Dependencies (F+), Attribute Closure (X+), Canonical / Minimal Cover' },
          { name: 'Normal Forms: 1NF (Atomic attributes), 2NF (No partial dependency on candidate key), 3NF (No transitive dependency: for X->Y, either X is superkey or Y is prime attribute), BCNF (Boyce-Codd Normal Form: for X->Y, X must be superkey), 4NF (Multivalued Dependencies MVD), 5NF (Join Dependencies)' },
          { name: 'Decomposition Properties: Lossless-Join Decomposition vs Dependency-Preserving Decomposition' },
        ],
      },
      {
        name: 'Transaction Processing, Concurrency Control and Storage Indexing',
        subtopics: [
          { name: 'Transaction Management: ACID Properties (Atomicity, Consistency, Isolation, Durability), Transaction States' },
          { name: 'Serializability: Conflict Serializability (Precedence / Conflict Graph) vs View Serializability, Recoverability, Cascadeless Schedules' },
          { name: 'Concurrency Control Protocols: Lock-Based Protocols (Shared/Exclusive Locks, Two-Phase Locking 2PL: Basic 2PL, Strict 2PL, Rigorous 2PL), Timestamp-Based Protocols (Thomas’ Write Rule), Validation-Based Protocols, Deadlock Handling (Prevention: Wait-Die, Wound-Wait; Detection & Recovery)' },
          { name: 'Database Recovery: Log-Based Recovery (Deferred vs Immediate Modification, Checkpoints, ARIES Algorithm)' },
          { name: 'Storage and Indexing: Primary, Secondary, Clustering Indexing, B-Trees and B+ Trees (Insertion, Deletion, Height, Order), Hash Indexing' },
          { name: 'NoSQL Databases (Key-Value, Document, Column-Family, Graph DBs, CAP Theorem) and Big Data / Data Warehousing' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit 5: Operating System',
    topics: [
      {
        name: 'Operating System Fundamentals and Process Management',
        subtopics: [
          { name: 'Operating System Roles: Batch, Multi-programmed, Time-Sharing, Real-Time, Distributed Systems, System Calls' },
          { name: 'Process Concepts: Process States, Process Control Block (PCB), Context Switching, Process Creation (fork system call), Threads (User-Level vs Kernel-Level Threads, Multi-threading models)' },
          { name: 'CPU Scheduling: Preemptive vs Non-Preemptive, Scheduling Criteria, Algorithms (FCFS, SJF, SRTF, Round Robin with Time Quantum, Priority Scheduling, Multilevel Queue, Multilevel Feedback Queue)' },
        ],
      },
      {
        name: 'Process Synchronization and Deadlocks',
        subtopics: [
          { name: 'Critical Section Problem: Requirements for Solution (Mutual Exclusion, Progress, Bounded Waiting)' },
          { name: 'Synchronization Solutions: Software Solutions (Peterson’s Algorithm), Hardware Instructions (Test-and-Set, Compare-and-Swap), Semaphores (Counting and Binary Semaphores, Wait/P and Signal/V operations), Classical Synchronization Problems (Producer-Consumer / Bounded-Buffer, Readers-Writers, Dining Philosophers Problem), Monitors' },
          { name: 'Deadlocks: Four Necessary Conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait), Resource Allocation Graph (RAG)' },
          { name: 'Deadlock Handling: Prevention, Avoidance (Banker’s Algorithm: Safety Algorithm, Resource-Request Algorithm), Detection and Recovery' },
        ],
      },
      {
        name: 'Memory Management, Virtual Memory and File Systems',
        subtopics: [
          { name: 'Memory Management: Logical vs Physical Address Space, Dynamic Loading/Linking, Swapping, Contiguous Allocation (Fixed/Variable Partitions, First-Fit, Best-Fit, Worst-Fit, Internal & External Fragmentation, Compaction)' },
          { name: 'Paging: Page Table Structure, Translation Lookaside Buffer (TLB), Effective Memory Access Time (EMAT), Inverted Page Table, Segmentation' },
          { name: 'Virtual Memory: Demand Paging, Page Fault Handling, Page Replacement Algorithms (FIFO, Belady’s Anomaly, Optimal Page Replacement, Least Recently Used LRU, Second-Chance / Clock Algorithm), Thrashing, Working-Set Model, Page Fault Frequency' },
          { name: 'File Systems & Disk Scheduling: File Allocation Methods (Contiguous, Linked, Indexed), Disk Scheduling Algorithms (FCFS, SSTF, SCAN / Elevator, C-SCAN, LOOK, C-LOOK), RAID Levels (RAID 0, 1, 5, 6)' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit 6: Software Engineering',
    topics: [
      {
        name: 'Software Process Models and Agile Methodologies',
        subtopics: [
          { name: 'Software Development Life Cycle (SDLC): Requirements, Design, Implementation, Testing, Maintenance' },
          { name: 'Process Models: Waterfall Model, Incremental Model, RAD Model, Prototyping Model, Spiral Model (Risk-Driven), Component-Based Development' },
          { name: 'Agile Software Development: Agile Manifesto, Scrum (Product Backlog, Sprint, Daily Scrum, Sprint Review/Retrospective, Scrum Master, Burndown Charts), Extreme Programming (XP: Pair Programming, TDD), Kanban' },
        ],
      },
      {
        name: 'Requirements Engineering, Software Design and UML Modeling',
        subtopics: [
          { name: 'Requirements Engineering: Inception, Elicitation, Elaboration, Negotiation, Specification (Software Requirements Specification SRS - Characteristics: Unambiguous, Complete, Verifiable), Validation' },
          { name: 'Software Design Concepts: Modularity, Abstraction, Architecture, Cohesion (Functional, Sequential, Communicational, Procedural, Temporal, Logical, Coincidental - High Cohesion desired) vs Coupling (Data, Stamp, Control, External, Common, Content - Low Coupling desired)' },
          { name: 'Object-Oriented Design and UML Diagrams: Structural Diagrams (Class Diagram, Object Diagram, Component Diagram) vs Behavioural Diagrams (Use Case Diagram, Sequence Diagram, Activity Diagram, State Machine Diagram)' },
          { name: 'Design Patterns (Gang of Four GoF): Creational (Singleton, Factory Method, Abstract Factory), Structural (Adapter, Decorator, Facade), Behavioural (Observer, Strategy, Command)' },
        ],
      },
      {
        name: 'Software Metrics, Estimation, Testing and Maintenance',
        subtopics: [
          { name: 'Software Estimation Models: Lines of Code (LOC), Function Point Analysis (FPA - Unadjusted Function Points, Complexity Adjustment Factor), COCOMO Model (Constructive Cost Model: Basic, Intermediate, Detailed COCOMO for Organic, Semi-Detached, Embedded Systems), Halstead’s Software Science' },
          { name: 'Software Testing Strategies: Verification vs Validation, Black-Box Testing (Equivalence Partitioning, Boundary Value Analysis BVA, Cause-Effect Graphing) vs White-Box Testing (Statement Coverage, Branch/Decision Coverage, Path Coverage, McCabe’s Cyclomatic Complexity: V(G) = E - N + 2P = Predicate Nodes + 1)' },
          { name: 'Testing Levels: Unit Testing, Integration Testing (Top-Down, Bottom-Up, Big-Bang), System Testing, Acceptance Testing (Alpha vs Beta Testing), Regression Testing' },
          { name: 'Software Maintenance: Corrective, Adaptive, Perfective, Preventive Maintenance, Reverse Engineering, Re-engineering, CMMI Levels (Initial, Managed, Defined, Quantitatively Managed, Optimizing)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit 7: Data Structures and Algorithms',
    topics: [
      {
        name: 'Abstract Data Types and Linear / Non-Linear Data Structures',
        subtopics: [
          { name: 'Linear Data Structures: Arrays (Row-Major and Column-Major Address Calculations), Stacks (Infix, Postfix, Prefix Conversions and Evaluations), Queues (Circular Queue, Deque, Priority Queue using Heaps), Linked Lists (Singly, Doubly, Circular Linked Lists)' },
          { name: 'Trees: Binary Trees, Binary Search Trees (BST - Search, Insertion, Deletion), AVL Trees (Rotations: LL, RR, LR, RL, Height Balance Factor -1, 0, +1), Red-Black Trees (Properties, Color flips, Rotations), B-Trees and B+ Trees, Heaps (Max-Heap, Min-Heap, Heapify Operation, Priority Queues)' },
          { name: 'Hashing: Hash Functions (Division, Multiplication, Mid-Square), Collision Resolution Techniques (Open Addressing: Linear Probing, Quadratic Probing, Double Hashing; Separate Chaining)' },
        ],
      },
      {
        name: 'Algorithm Analysis, Design Paradigms and Sorting/Searching',
        subtopics: [
          { name: 'Asymptotic Analysis: Big-O, Big-Omega (Ω), Big-Theta (Θ), Little-o, Little-omega notations, Recurrence Relations (Master Theorem, Substitution Method, Recursion Tree Method)' },
          { name: 'Divide and Conquer Paradigm: Merge Sort (Time: O(n log n), Space: O(n)), Quick Sort (Worst-case O(n²), Average-case O(n log n), Randomized Quick Sort), Binary Search' },
          { name: 'Greedy Strategy: Fractional Knapsack Problem, Huffman Coding (Prefix Codes, Optimal Merge Patterns), Minimum Spanning Trees (Kruskal’s Algorithm with Disjoint Set Union DSU, Prim’s Algorithm), Single-Source Shortest Path (Dijkstra’s Algorithm)' },
          { name: 'Dynamic Programming: Principle of Optimality, 0/1 Knapsack Problem, Longest Common Subsequence (LCS), Matrix Chain Multiplication, All-Pairs Shortest Path (Floyd-Warshall Algorithm), Bellman-Ford Algorithm (Handles Negative Weight Cycles)' },
          { name: 'Backtracking and Branch-and-Bound: N-Queens Problem, Sum of Subsets, Graph Coloring, Travelling Salesperson Problem (TSP)' },
        ],
      },
      {
        name: 'Graph Algorithms and Complexity Classes (P, NP, NP-Complete)',
        subtopics: [
          { name: 'Graph Traversals: Breadth-First Search (BFS - Shortest path in unweighted graphs), Depth-First Search (DFS - Articulation Points, Bridges, Topological Sorting)' },
          { name: 'Maximum Flow: Ford-Fulkerson Method, Max-Flow Min-Cut Theorem' },
          { name: 'Computational Complexity: Class P (Polynomial Time Solvable), Class NP (Polynomial Time Verifiable), NP-Hard and NP-Complete Classes, Polynomial-Time Reducibility' },
          { name: 'Canonical NP-Complete Problems: Circuit SAT, 3-SAT (Cook-Levin Theorem), Vertex Cover Problem, Hamiltonian Cycle Problem, Clique Problem, Subset Sum Problem' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit 8: Theory of Computation and Compilers',
    topics: [
      {
        name: 'Chomsky Hierarchy, Finite Automata and Regular Languages',
        subtopics: [
          { name: 'Chomsky Hierarchy: Type 0 (Unrestricted / Turing Machines), Type 1 (Context-Sensitive / Linear Bounded Automata), Type 2 (Context-Free / Pushdown Automata), Type 3 (Regular / Finite Automata)' },
          { name: 'Finite Automata: Deterministic Finite Automata (DFA), Non-Deterministic Finite Automata (NFA), ε-NFA to DFA Conversion (Subset Construction), Minimization of DFA (Myhill-Nerode Theorem, Table Filling Algorithm)' },
          { name: 'Regular Expressions: Arden’s Theorem, Equivalence with Finite Automata, Pumping Lemma for Regular Languages (Proving non-regularity), Closure Properties and Decision Properties of Regular Languages' },
          { name: 'Finite Automata with Output: Moore Machines vs Mealy Machines and their conversions' },
        ],
      },
      {
        name: 'Context-Free Languages, Pushdown Automata and Turing Machines',
        subtopics: [
          { name: 'Context-Free Grammars (CFG): Derivation Trees, Leftmost and Rightmost Derivations, Ambiguous Grammars, Normal Forms (Chomsky Normal Form CNF: A->BC | a; Greibach Normal Form GNF)' },
          { name: 'Pushdown Automata (PDA): Deterministic (DPDA) vs Non-Deterministic (NPDA), Acceptance by Empty Stack vs Final State, Equivalence with CFGs, Pumping Lemma for CFLs, Closure Properties of CFLs' },
          { name: 'Turing Machines (TM): Formal Definition, Instantaneous Descriptions, Multi-tape TMs, Non-Deterministic TMs, Recursive vs Recursively Enumerable (RE) Languages, Universal Turing Machine' },
          { name: 'Decidability and Undecidability: Halting Problem of Turing Machine (Diagonalization Language), Post’s Correspondence Problem (PCP), Rice’s Theorem, Undecidable problems for CFGs and TMs' },
        ],
      },
      {
        name: 'Compiler Design: Lexical, Syntax, Semantic Analysis & Code Generation',
        subtopics: [
          { name: 'Phases of a Compiler: Lexical Analyzer, Syntax Analyzer, Semantic Analyzer, Intermediate Code Generator, Code Optimizer, Target Code Generator, Symbol Table and Error Handler' },
          { name: 'Lexical Analysis: Tokens, Patterns, Lexemes, LEX tool' },
          { name: 'Syntax Analysis (Parsing): Top-Down Parsing (LL(1) Parsers: FIRST and FOLLOW sets, Predictive Parsing Table, LL(1) Grammars) vs Bottom-Up Parsing (LR Parsers: LR(0), SLR(1), LALR(1), CLR(1) / Canonical LR, Shift-Reduce and Reduce-Reduce Conflicts, YACC tool)' },
          { name: 'Syntax-Directed Translation (SDT): S-Attributed Definitions (Synthesized attributes only, evaluated bottom-up) vs L-Attributed Definitions (Synthesized and inherited attributes)' },
          { name: 'Intermediate Code Generation: Three-Address Code (Quadruples, Triples, Indirect Triples), Abstract Syntax Trees (AST)' },
          { name: 'Code Optimization: Basic Blocks, Control Flow Graphs (CFG), Loop Optimization (Code Motion, Induction Variable Elimination, Loop Unrolling), Common Subexpression Elimination, Dead Code Elimination, Register Allocation' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit 9: Data Communication and Computer Networks',
    topics: [
      {
        name: 'Network Models, Physical Layer and Transmission Media',
        subtopics: [
          { name: 'Network Topologies: Mesh, Star, Bus, Ring, Hybrid topologies' },
          { name: 'Layered Architecture: OSI 7-Layer Reference Model (Physical, Data Link, Network, Transport, Session, Presentation, Application) vs TCP/IP Protocol Suite' },
          { name: 'Physical Layer: Data Rate Limits (Nyquist Bit Rate for Noiseless Channels: 2B log2 V; Shannon Capacity for Noisy Channels: B log2 (1 + SNR)), Transmission Media (Guided: Twisted Pair, Coaxial, Fiber Optic; Unguided: Radio, Microwave, Infrared), Multiplexing (FDM, TDM, WDM), Switching (Circuit, Packet: Datagram vs Virtual Circuit)' },
        ],
      },
      {
        name: 'Data Link Layer: Error Detection/Correction and MAC Protocols',
        subtopics: [
          { name: 'Error Detection & Correction: Parity, Checksum, Cyclic Redundancy Check (CRC Polynomials), Hamming Code (Single error correction, Double error detection)' },
          { name: 'Framing and Flow Control Protocols: Stop-and-Wait ARQ, Sliding Window Protocols (Go-Back-N ARQ vs Selective Repeat ARQ: Window sizes, Efficiency = N / (1 + 2a))' },
          { name: 'Multiple Access Protocols: Random Access (ALOHA - Pure ALOHA throughput 18.4% vs Slotted ALOHA throughput 36.8%, CSMA, CSMA/CD for Ethernet with Binary Exponential Backoff, CSMA/CA for Wi-Fi), Controlled Access (Polling, Token Passing)' },
          { name: 'LAN Standards: IEEE 802.3 (Ethernet), IEEE 802.11 (Wireless LAN / Wi-Fi), IEEE 802.15 (Bluetooth), Bridges, Switches (VLANs)' },
        ],
      },
      {
        name: 'Network Layer, Routing Algorithms and IP Addressing',
        subtopics: [
          { name: 'IP Addressing: IPv4 Addressing (Classful A, B, C, D, E vs Classless CIDR Subnetting, Supernetting, Subnet Masks), IPv6 Addressing (128-bit structure, Dual Stack, Tunneling)' },
          { name: 'Network Layer Protocols: Address Resolution Protocol (ARP), RARP, Internet Protocol (IPv4 Header fields, Fragmentation: MTU, Identification, Flags DF/MF, Fragment Offset, TTL), ICMP, IGMP' },
          { name: 'Routing Algorithms: Distance Vector Routing (Bellman-Ford Algorithm, Count-to-Infinity Problem, Split Horizon, Poison Reverse) vs Link State Routing (Dijkstra’s SPF Algorithm, OSPF Protocol), Path Vector Routing (BGP), RIP' },
        ],
      },
      {
        name: 'Transport Layer, Application Layer Protocols and Network Security',
        subtopics: [
          { name: 'Transport Layer Protocols: UDP (Connectionless, Unreliable, Header format) vs TCP (Connection-Oriented, Reliable, 3-Way Handshake, TCP Header, Flow Control: Sliding Window, Congestion Control: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery - AIMD)' },
          { name: 'Application Layer Protocols: DNS (Domain Name System), HTTP/HTTPS, FTP (Active vs Passive modes), SMTP, POP3, IMAP, DHCP, Telnet, SSH' },
          { name: 'Network Security & Cryptography: Symmetric Key Cryptography (DES, AES) vs Asymmetric Public Key Cryptography (RSA Algorithm, Diffie-Hellman Key Exchange), Cryptographic Hash Functions (MD5, SHA), Digital Signatures, Digital Certificates (X.509), Firewalls (Packet filtering, Statefull, Application gateway), IPsec, SSL/TLS' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit 10: Artificial Intelligence (AI)',
    topics: [
      {
        name: 'AI Foundations, State Space Search and Problem Solving',
        subtopics: [
          { name: 'AI Foundations: Turing Test, Rational Agents, Environment Types (Accessible/Inaccessible, Deterministic/Stochastic, Episodic/Sequential, Static/Dynamic, Discrete/Continuous)' },
          { name: 'Uninformed / Blind Search Strategies: Breadth-First Search (BFS), Depth-First Search (DFS), Uniform-Cost Search (Dijkstra), Depth-Limited Search, Iterative Deepening Search (IDDFS), Bidirectional Search' },
          { name: 'Informed / Heuristic Search Strategies: Greedy Best-First Search, A* Search Algorithm (Admissibility of Heuristic h(n) ≤ h*(n), Consistency/Monotonicity, Optimality), Memory-Bounded Heuristic Search (IDA*, SMA*)' },
          { name: 'Local Search & Optimization: Hill Climbing (Local Maxima, Ridges, Plateau), Simulated Annealing (Boltzmann distribution), Genetic Algorithms (Chromosome representation, Selection, Crossover, Mutation)' },
          { name: 'Adversarial Search (Game Playing): Minimax Algorithm, Alpha-Beta Pruning (Optimal moves, Pruning conditions: α ≥ β)' },
        ],
      },
      {
        name: 'Knowledge Representation, First-Order Logic and Fuzzy Logic',
        subtopics: [
          { name: 'Knowledge Representation Systems: Semantic Networks, Frames, Conceptual Dependency (Roger Schank), Scripts' },
          { name: 'First-Order Predicate Logic (FOPL): Syntax, Semantics, Quantifiers, Unification Algorithm, Conversion to Clausal Form (Skolemization), Resolution Refutation Principle in Propositional and First-Order Logic' },
          { name: 'Reasoning under Uncertainty: Probabilistic Reasoning, Bayesian Belief Networks (Conditional Probability Tables CPT, Exact and Approximate Inference), Dempster-Shafer Theory, Default Reasoning' },
          { name: 'Fuzzy Logic: Fuzzy Sets vs Crisp Sets, Membership Functions, Fuzzy Set Operations (Union/Max, Intersection/Min, Complement), Fuzzy Relations, Fuzzy Rules and Fuzzy Inference Systems (Mamdani vs Sugeno Models), Defuzzification Methods (Centroid, Mean of Maxima)' },
        ],
      },
      {
        name: 'Machine Learning, Neural Networks and Natural Language Processing',
        subtopics: [
          { name: 'Machine Learning Paradigms: Supervised Learning (Linear/Logistic Regression, Decision Trees - ID3, C4.5, Entropy, Information Gain; Support Vector Machines SVM - Hyperplanes, Kernel Trick, k-Nearest Neighbors k-NN, Naive Bayes Classifier), Unsupervised Learning (k-Means Clustering, Hierarchical Clustering), Reinforcement Learning (Q-Learning, Markov Decision Processes MDP)' },
          { name: 'Artificial Neural Networks (ANN): McCulloch-Pitts Neuron, Single-Layer Perceptron (Perceptron Convergence Theorem, XOR Problem limitation), Multi-Layer Perceptron (MLP), Activation Functions (Sigmoid, Tanh, ReLU, Softmax), Backpropagation Algorithm (Gradient Descent, Chain Rule, Vanishing Gradient Problem), Deep Learning Architectures (Convolutional Neural Networks CNN, Recurrent Neural Networks RNN, Long Short-Term Memory LSTM, Transformers)' },
          { name: 'Natural Language Processing (NLP): Morphological Analysis, POS Tagging, Syntactic Parsing (CYK, Earley algorithm), Semantic Analysis, Word Embeddings (Word2Vec, GloVe), Large Language Models (LLMs)' },
          { name: 'Expert Systems: Architecture (Knowledge Base, Inference Engine: Forward Chaining vs Backward Chaining, User Interface), Rule-Based Expert Systems, Explanation Facility (MYCIN, DENDRAL)' },
        ],
      },
    ],
  },
];
