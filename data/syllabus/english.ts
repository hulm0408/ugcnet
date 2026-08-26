import type { OfficialSyllabusUnit, SyllabusSourceInfo } from '../../config/subjects/types';

export const englishSyllabusSource: SyllabusSourceInfo = {
  authority: 'UGC / NTA',
  documentTitle: 'UGC NET English (Code 30) Official Syllabus',
  retrievedDate: '2024-08',
  verified: true,
};

export const englishSyllabus: OfficialSyllabusUnit[] = [
  {
    unitNumber: 1,
    title: 'Unit I: Drama',
    topics: [
      {
        name: 'Classical, Medieval and Elizabethan Drama',
        subtopics: [
          { name: 'Classical Foundations: Greek Tragedy (Aeschylus, Sophocles, Euripides), Aristotle’s Poetics, Roman Comedy (Plautus, Terence, Seneca)' },
          { name: 'Medieval Drama: Mystery, Miracle, and Morality Plays (Everyman), Interludes (John Heywood)' },
          { name: 'University Wits: Christopher Marlowe (Doctor Faustus, Tamburlaine, The Jew of Malta), Thomas Kyd (The Spanish Tragedy - Revenge Tragedy formula)' },
          { name: 'William Shakespeare: Tragedies (Hamlet, Othello, King Lear, Macbeth), Comedies (Twelfth Night, As You Like It), Problem Plays (Measure for Measure), Roman Plays, Romances (The Tempest)' },
        ],
      },
      {
        name: 'Jacobean, Caroline and Restoration Drama',
        subtopics: [
          { name: 'Jacobean Tragedy & City Comedy: Ben Jonson (Comedy of Humours - Volpone, The Alchemist), John Webster (The Duchess of Malfi, The White Devil), Thomas Middleton, John Ford' },
          { name: 'Restoration Comedy of Manners: William Congreve (The Way of the World), William Wycherley (The Country Wife), George Etherege, Aphra Behn (The Rover)' },
          { name: 'Heroic Drama: John Dryden (All for Love, The Conquest of Granada)' },
        ],
      },
      {
        name: '18th & 19th Century Sentimental and Melodramatic Drama',
        subtopics: [
          { name: 'Anti-Sentimental Comedy: Oliver Goldsmith (She Stoops to Conquer), Richard Brinsley Sheridan (The Rivals, The School for Scandal)' },
          { name: '19th Century Closet Drama & Late Victorian Wit: Oscar Wilde (The Importance of Being Earnest, Lady Windermere’s Fan), Arthur Wing Pinero' },
        ],
      },
      {
        name: 'Modern British, Irish & Continental Drama',
        subtopics: [
          { name: 'Drama of Ideas & Realism: George Bernard Shaw (Pygmalion, Man and Superman, Saint Joan), Henrik Ibsen (A Doll’s House, Ghosts), Anton Chekhov (The Cherry Orchard)' },
          { name: 'Irish Dramatic Movement: W.B. Yeats, J.M. Synge (The Playboy of the Western World), Sean O’Casey' },
          { name: 'Epic Theatre: Bertolt Brecht (Mother Courage, The Good Woman of Setzuan - Verfremdungseffekt / Alienation Effect)' },
          { name: 'Theatre of the Absurd: Samuel Beckett (Waiting for Godot, Endgame), Harold Pinter (The Birthday Party, The Caretaker - Comedy of Menace), Eugene Ionesco, Tom Stoppard (Rosencrantz and Guildenstern are Dead)' },
          { name: 'Angry Young Men / Kitchen Sink Realism: John Osborne (Look Back in Anger), Arnold Wesker' },
        ],
      },
      {
        name: 'American, Postcolonial and Indian English Drama',
        subtopics: [
          { name: 'American Drama: Eugene O’Neill (Long Day’s Journey into Night, The Hairy Ape), Arthur Miller (Death of a Salesman, The Crucible), Tennessee Williams (A Streetcar Named Desire, The Glass Menagerie), Edward Albee (Who’s Afraid of Virginia Woolf?), August Wilson, Lorraine Hansberry' },
          { name: 'Postcolonial & African Drama: Wole Soyinka (Death and the King’s Horseman, A Dance of the Forests), Derek Walcott (Dream on Monkey Mountain), Athol Fugard' },
          { name: 'Indian English Drama: Girish Karnad (Tughlaq, Hayavadana, Nagamandala), Vijay Tendulkar (Silence! The Court is in Session, Ghashiram Kotwal), Mahesh Dattani (Final Solutions, Tara), Badal Sircar (Third Theatre - Evam Indrajit)' },
        ],
      },
    ],
  },
  {
    unitNumber: 2,
    title: 'Unit II: Poetry',
    topics: [
      {
        name: 'Old, Middle English and Renaissance Poetry',
        subtopics: [
          { name: 'Old English Epic: Beowulf (Kennings, Alliterative verse), The Wanderer, The Seafarer' },
          { name: 'Geoffrey Chaucer: The Canterbury Tales (General Prologue, The Wife of Bath’s Tale, The Knight’s Tale), Troilus and Criseyde, Estates Satire' },
          { name: 'Tudor & Elizabethan Poetry: Sir Thomas Wyatt & Earl of Surrey (Sonnet form introduction), Edmund Spenser (The Faerie Queene - Spenserian stanza, Amoretti), Sir Philip Sidney (Astrophel and Stella)' },
          { name: 'Metaphysical Poets: John Donne (A Valediction: Forbidding Mourning, The Flea, Holy Sonnets - Conceits), George Herbert (The Collar, Easter Wings), Andrew Marvell (To His Coy Mistress), Henry Vaughan' },
          { name: 'Cavalier Poets: Robert Herrick, Richard Lovelace, Sir John Suckling' },
          { name: 'John Milton: Paradise Lost (Grand style, Invocation, Satan’s speeches in Book I, Fall in Book IX), Paradise Regained, Samson Agonistes, Lycidas (Pastoral Elegy)' },
        ],
      },
      {
        name: 'Neo-Classical, Augustan and Transitional Pre-Romantic Poetry',
        subtopics: [
          { name: 'John Dryden: Absalom and Achitophel (Heroic Couplets, Political Satire), Mac Flecknoe' },
          { name: 'Alexander Pope: The Rape of the Lock (Mock-Heroic Epic), An Essay on Criticism, The Dunciad' },
          { name: 'Graveyard Poets: Thomas Gray (Elegy Written in a Country Churchyard), Edward Young, Robert Blair' },
          { name: 'Pre-Romantics: William Blake (Songs of Innocence and of Experience, The Marriage of Heaven and Hell), Robert Burns, William Cowper' },
        ],
      },
      {
        name: 'Romantic and Victorian Poetry',
        subtopics: [
          { name: 'First Generation Romantics: William Wordsworth (Lyrical Ballads 1798 Preface, The Prelude, Tintern Abbey, Immortality Ode), S.T. Coleridge (The Rime of the Ancient Mariner, Kubla Khan, Christabel)' },
          { name: 'Second Generation Romantics: Lord Byron (Childe Harold’s Pilgrimage, Don Juan - Byronic Hero), P.B. Shelley (Ode to the West Wind, To a Skylark, Adonais, Prometheus Unbound), John Keats (Odes - Ode on a Grecian Urn, Ode to a Nightingale, Negative Capability)' },
          { name: 'Major Victorians: Alfred Lord Tennyson (In Memoriam A.H.H., Ulysses, The Lady of Shalott), Robert Browning (Dramatic Monologues - My Last Duchess, Andrea del Sarto, Fra Lippo Lippi), Matthew Arnold (Dover Beach, The Scholar-Gipsy, Thyrsis)' },
          { name: 'Pre-Raphaelites & Decadence: D.G. Rossetti, Christina Rossetti (Goblin Market), A.C. Swinburne, Gerard Manley Hopkins (Sprung Rhythm, Inscape, Instress)' },
        ],
      },
      {
        name: 'Modernist, War and Post-War British Poetry',
        subtopics: [
          { name: 'WWI War Poets: Wilfred Owen (Dulce et Decorum Est, Strange Meeting), Siegfried Sassoon, Rupert Brooke' },
          { name: 'High Modernism: W.B. Yeats (The Second Coming, Sailing to Byzantium, Easter 1916 - Gyres, Celtic Revival), T.S. Eliot (The Waste Land 1922, The Love Song of J. Alfred Prufrock, Four Quartets)' },
          { name: '1930s Auden Generation: W.H. Auden (Funeral Blues, Musée des Beaux Arts, In Memory of W.B. Yeats), Stephen Spender, Louis MacNeice' },
          { name: 'Mid-Century & Movement Poets: Dylan Thomas (Do Not Go Gentle into That Good Night, Fern Hill), Philip Larkin (The Whitsun Weddings, Church Going), Ted Hughes (Crow, Hawk Roosting - Animal Vitalism), Seamus Heaney (Digging, Death of a Naturalist)' },
        ],
      },
      {
        name: 'American, Postcolonial and Indian English Poetry',
        subtopics: [
          { name: '19th Century American: Walt Whitman (Leaves of Grass, Song of Myself - Free Verse), Emily Dickinson (Slant Rhyme, Death and Immortality poems)' },
          { name: '20th Century American: Robert Frost, Wallace Stevens (The Emperor of Ice-Cream), Langston Hughes (Harlem Renaissance), Sylvia Plath & Robert Lowell (Confessional Poetry), Allen Ginsberg (Beat Generation - Howl)' },
          { name: 'Postcolonial & Commonwealth: Derek Walcott, Kamau Brathwaite, Judith Wright, A.D. Hope, Gabriel Okara' },
          { name: 'Indian English Poetry: Henry Derozio, Toru Dutt, Sri Aurobindo (Savitri), Sarojini Naidu, Nissim Ezekiel (Night of the Scorpion, Enterprise), A.K. Ramanujan, Kamala Das (An Introduction - Confessional voice), Jayanta Mahapatra, Arun Kolatkar (Jejuri)' },
        ],
      },
    ],
  },
  {
    unitNumber: 3,
    title: 'Unit III: Fiction, Short Story',
    topics: [
      {
        name: 'Rise of the 18th Century English Novel and Gothic Fiction',
        subtopics: [
          { name: 'Early Novel Pioneers: Daniel Defoe (Robinson Crusoe, Moll Flanders), Samuel Richardson (Pamela - Epistolary form, Clarissa), Henry Fielding (Tom Jones, Joseph Andrews - Picaresque & Comic Epic in Prose), Laurence Sterne (Tristram Shandy - Anti-Novel)' },
          { name: 'Gothic Romance: Horace Walpole (The Castle of Otranto 1764), Ann Radcliffe (The Mysteries of Udolpho), Matthew Lewis (The Monk), Mary Shelley (Frankenstein 1818)' },
        ],
      },
      {
        name: '19th Century Victorian Novel: Realism, Industrialization and Satire',
        subtopics: [
          { name: 'Jane Austen: Pride and Prejudice, Emma, Sense and Sensibility, Persuasion (Free Indirect Discourse, Irony)' },
          { name: 'Charles Dickens: Great Expectations, David Copperfield, Bleak House, Hard Times, A Tale of Two Cities' },
          { name: 'Brontë Sisters: Charlotte Brontë (Jane Eyre), Emily Brontë (Wuthering Heights), Anne Brontë' },
          { name: 'George Eliot (Mary Ann Evans): Middlemarch (Provincial Life), The Mill on the Floss, Silas Marner' },
          { name: 'W.M. Thackeray (Vanity Fair - A Novel without a Hero), Thomas Hardy (Tess of the d’Urbervilles, Jude the Obscure - Wessex, Tragic Determinism)' },
        ],
      },
      {
        name: '20th Century Modernist and Stream of Consciousness Fiction',
        subtopics: [
          { name: 'Stream of Consciousness & Modernist Form: James Joyce (Ulysses 1922, A Portrait of the Artist as a Young Man, Dubliners), Virginia Woolf (Mrs. Dalloway, To the Lighthouse, Orlando)' },
          { name: 'Psychological & Social Realism: D.H. Lawrence (Sons and Lovers, Women in Love), E.M. Forster (A Passage to India, Howards End), Joseph Conrad (Heart of Darkness, Lord Jim)' },
          { name: 'Dystopian & Political Fiction: George Orwell (Nineteen Eighty-Four, Animal Farm), Aldous Huxley (Brave New World), William Golding (Lord of the Flies)' },
        ],
      },
      {
        name: 'Postmodern, Postcolonial and Global Fiction',
        subtopics: [
          { name: 'Postmodernism & Historiographic Metafiction: Salman Rushdie (Midnight’s Children 1981 - Magic Realism), John Fowles (The French Lieutenant’s Woman), Angela Carter, Julian Barnes, Kazuo Ishiguro (The Remains of the Day)' },
          { name: 'African Fiction: Chinua Achebe (Things Fall Apart 1958, Arrow of God), Ngũgĩ wa Thiong’o (A Grain of Wheat, Petals of Blood), Chimamanda Ngozi Adichie' },
          { name: 'American Fiction: Nathaniel Hawthorne (The Scarlet Letter), Herman Melville (Moby-Dick), F. Scott Fitzgerald (The Great Gatsby), William Faulkner (The Sound and the Fury - Yoknapatawpha County), Ernest Hemingway (The Old Man and the Sea - Iceberg Theory), Toni Morrison (Beloved, The Bluest Eye - African American experience)' },
          { name: 'Indian English Novel: Mulk Raj Anand (Untouchable, Coolie), R.K. Narayan (Swami and Friends, The Guide - Malgudi), Raja Rao (Kanthapura 1938), Anita Desai (Clear Light of Day), Amitav Ghosh (The Shadow Lines, Ibis Trilogy), Arundhati Roy (The God of Small Things)' },
        ],
      },
      {
        name: 'Short Story as a Literary Art Form',
        subtopics: [
          { name: 'Pioneers: Edgar Allan Poe (The Tell-Tale Heart, The Fall of the House of Usher - Unity of Effect), Guy de Maupassant, Anton Chekhov, O. Henry' },
          { name: 'Modern & Postmodern Short Fiction: Katherine Mansfield, Jorge Luis Borges (Ficciones), Franz Kafka (The Metamorphosis), Alice Munro, Raymond Carver' },
        ],
      },
    ],
  },
  {
    unitNumber: 4,
    title: 'Unit IV: Non-Fictional Prose',
    topics: [
      {
        name: 'Renaissance to 18th Century Essays and Periodicals',
        subtopics: [
          { name: 'Francis Bacon: Essays (Of Truth, Of Studies, Of Revenge - Aphoristic style)' },
          { name: 'John Milton: Areopagitica (1644 - Freedom of the Press)' },
          { name: 'Periodical Essayists: Joseph Addison & Richard Steele (The Tatler, The Spectator - Sir Roger de Coverley), Samuel Johnson (The Rambler, Lives of the English Poets, Preface to Shakespeare)' },
          { name: 'Political & Philosophical Prose: Jonathan Swift (A Modest Proposal), Edmund Burke (Reflections on the Revolution in France)' },
        ],
      },
      {
        name: '19th Century Romantic and Victorian Non-Fiction',
        subtopics: [
          { name: 'Romantic Essays: Charles Lamb (Essays of Elia - Personal, Nostalgic Prose), William Hazlitt (The Spirit of the Age), Thomas De Quincey (Confessions of an English Opium-Eater)' },
          { name: 'Victorian Sage Writing: Thomas Carlyle (Sartor Resartus, On Heroes and Hero-Worship), John Ruskin (Unto This Last, Modern Painters), Matthew Arnold (Culture and Anarchy - Sweetness and Light, Hellenism vs Hebraism), Walter Pater (The Renaissance - Art for Art’s Sake)' },
        ],
      },
      {
        name: '20th Century Essays, Autobiographies and Life Writing',
        subtopics: [
          { name: 'George Orwell: Shooting an Elephant, Politics and the English Language' },
          { name: 'Virginia Woolf: A Room of One’s Own (1929 - Feminist non-fiction, Judith Shakespeare)' },
          { name: 'Autobiographical Masterpieces: Lytton Strachey (Eminent Victorians), Bertrand Russell, Maya Angelou (I Know Why the Caged Bird Sings)' },
        ],
      },
      {
        name: 'Indian English Non-Fiction, Speeches and Travelogues',
        subtopics: [
          { name: 'Anti-Colonial & National Prose: M.K. Gandhi (The Story of My Experiments with Truth, Hind Swaraj), Jawaharlal Nehru (The Discovery of India, An Autobiography - Tryst with Destiny speech), B.R. Ambedkar (Annihilation of Caste 1936)' },
          { name: 'Post-Independence & Diasporic Non-Fiction: Nirad C. Chaudhuri (The Autobiography of an Unknown Indian), V.S. Naipaul (An Area of Darkness, India: A Wounded Civilization), Amartya Sen (The Argumentative Indian), Ramachandra Guha' },
        ],
      },
    ],
  },
  {
    unitNumber: 5,
    title: 'Unit V: Language: Basic Concepts, Theories & Pedagogy (English in India)',
    topics: [
      {
        name: 'Linguistic Systems: Phonetics, Phonology, Morphology & Syntax',
        subtopics: [
          { name: 'Phonetics & Phonology: IPA symbols, Organs of Speech, Consonants (Place and Manner of Articulation), Vowels, Diphthongs, Syllable structure, Stress, Intonation, Received Pronunciation (RP)' },
          { name: 'Morphology: Free and Bound Morphemes, Roots, Affixes, Inflectional vs Derivational morphology' },
          { name: 'Syntax & Grammar Models: Traditional Grammar, Structural Linguistics (Ferdinand de Saussure: Langue/Parole, Signifier/Signified, Syntagmatic/Paradigmatic), Transformational Generative Grammar (Noam Chomsky: Deep Structure, Surface Structure, Competence vs Performance, LAD)' },
          { name: 'Semantics & Pragmatics: Sense and Reference, Speech Acts (J.L. Austin - Locutionary, Illocutionary, Perlocutionary; John Searle), Grice’s Maxims of Cooperative Conversation' },
        ],
      },
      {
        name: 'Sociolinguistics, Psycholinguistics & Language Acquisition',
        subtopics: [
          { name: 'First Language Acquisition vs Second Language Acquisition (SLA)' },
          { name: 'Stephen Krashen’s SLA Hypotheses (Input Hypothesis i+1, Affective Filter, Natural Order)' },
          { name: 'Sociolinguistics: Dialect, Sociolect, Idiolect, Register, Pidgin, Creole, Code-switching, Code-mixing' },
        ],
      },
      {
        name: 'History of English in India and Institutional Policies',
        subtopics: [
          { name: 'Colonial Foundations: Charter Act 1813, Macaulay’s Minute on Indian Education 1835, Wood’s Despatch 1854, Indian Universities Act 1904' },
          { name: 'Post-Independence Language Commissions: Official Languages Act 1963, Three-Language Formula (Kothari Commission 1964-66), National Policy on Education 1986, NEP 2020' },
          { name: 'Braj Kachru’s Three Concentric Circles of English (Inner, Outer, Expanding Circles), Indian English Phonology and Lexicon' },
        ],
      },
      {
        name: 'English Language Teaching (ELT) Methods and Materials',
        subtopics: [
          { name: 'Classical Methods: Grammar-Translation Method (GTM), Direct Method' },
          { name: 'Structural & Behaviourist Methods: Audio-Lingual Method, Structural-Oral-Situational (SOS) approach' },
          { name: 'Communicative & Humanistic Approaches: Communicative Language Teaching (CLT), Task-Based Language Teaching (TBLT), Suggestopedia, Total Physical Response (TPR), Silent Way' },
          { name: 'Language Assessment & Testing: Diagnostic, Formative, Summative, Cloze tests, Rubrics' },
        ],
      },
    ],
  },
  {
    unitNumber: 6,
    title: 'Unit VI: Cultural Studies',
    topics: [
      {
        name: 'Foundations and Origins of Cultural Studies',
        subtopics: [
          { name: 'Birmingham Centre for Contemporary Cultural Studies (CCCS 1964): Richard Hoggart (The Uses of Literacy), Raymond Williams (Culture and Society, The Long Revolution - Culture is Ordinary, Structures of Feeling)' },
          { name: 'E.P. Thompson (The Making of the English Working Class), Stuart Hall (Encoding/Decoding Model of Communication, Representation)' },
        ],
      },
      {
        name: 'Key Concepts in Cultural Theory',
        subtopics: [
          { name: 'Frankfurt School & Culture Industry: Theodor Adorno, Max Horkheimer (Dialectic of Enlightenment), Walter Benjamin (The Work of Art in the Age of Mechanical Reproduction)' },
          { name: 'Antonio Gramsci: Cultural Hegemony, Organic Intellectuals, Subaltern Studies' },
          { name: 'Louis Althusser: Ideology and Ideological State Apparatuses (ISAs vs RSAs), Interpellation' },
          { name: 'Michel Foucault: Power/Knowledge, Discourse, Panopticism, Governmentality' },
          { name: 'Pierre Bourdieu: Cultural Capital, Habitus, Field, Symbolic Violence' },
        ],
      },
      {
        name: 'Subcultures, Popular Culture and Resistance',
        subtopics: [
          { name: 'Dick Hebdige (Subculture: The Meaning of Style - Bricolage, Youth countercultures)' },
          { name: 'John Fiske (Understanding Popular Culture - Excorporation vs Incorporation)' },
          { name: 'Mass Media, Advertising, Consumerism and Spectacle (Guy Debord - Society of the Spectacle)' },
        ],
      },
      {
        name: 'Globalization, Cyberculture and Space',
        subtopics: [
          { name: 'Arjun Appadurai: Modernity at Large - Five Global Cultural Flows (Ethnoscapes, Mediascapes, Technoscapes, Financescapes, Ideoscapes)' },
          { name: 'Donna Haraway: A Cyborg Manifesto (Cyborg feminism and technoscience)' },
          { name: 'Spatiality & Cultural Geography: Edward Soja (Thirdspace), Marc Augé (Non-Places)' },
        ],
      },
    ],
  },
  {
    unitNumber: 7,
    title: 'Unit VII: Literary Criticism',
    topics: [
      {
        name: 'Classical Greco-Roman Criticism',
        subtopics: [
          { name: 'Plato: Republic Book X - Mimesis (Art is twice removed from reality), Theory of Forms, Banishment of poets' },
          { name: 'Aristotle: Poetics - Defense of poetry, Mimesis, Hamartia (Tragic flaw), Anagnorisis (Recognition), Peripeteia (Reversal), Catharsis (Purgation of pity and fear), Plot as Soul of Tragedy' },
          { name: 'Horace: Ars Poetica - Dulce et Utile (To delight and instruct), Decorum' },
          { name: 'Longinus: On the Sublime - Five Sources of the Sublime (Grandeur of thought, Passion, Figures of speech, Diction, Composition)' },
        ],
      },
      {
        name: 'Renaissance, Neo-Classical and Enlightenment Criticism',
        subtopics: [
          { name: 'Sir Philip Sidney: An Apology for Poetry (Defence of Poesie 1595) - Poetry superior to philosophy and history' },
          { name: 'John Dryden: An Essay of Dramatic Poesy (1668) - Four speakers (Crites, Eugenius, Lisideius, Neander - defense of English drama)' },
          { name: 'Alexander Pope: An Essay on Criticism (1711) - Follow Nature, Wit, True Ease in writing' },
          { name: 'Samuel Johnson: Preface to Shakespeare (1765) - Shakespeare as poet of nature, violation of three unities defended' },
        ],
      },
      {
        name: 'Romantic and Victorian Criticism',
        subtopics: [
          { name: 'William Wordsworth: Preface to Lyrical Ballads (1800/1802) - Poetry as spontaneous overflow of powerful feelings recollected in tranquility, language of real men' },
          { name: 'S.T. Coleridge: Biographia Literaria (1817) - Primary vs Secondary Imagination, Fancy, Willing suspension of disbelief' },
          { name: 'P.B. Shelley: A Defence of Poetry (1821) - Poets are the unacknowledged legislators of the world' },
          { name: 'Matthew Arnold: The Study of Poetry (1880) - Touchstone Method, Poetry as Criticism of Life, Grand Style' },
          { name: 'Walter Pater: The Renaissance - Conclusion (Appreciations, Impressionistic criticism)' },
        ],
      },
      {
        name: 'Early 20th Century Critical Movements and Practical Criticism',
        subtopics: [
          { name: 'T.S. Eliot: Tradition and the Individual Talent (1919 - Depersonalization, Historical sense), Hamlet and His Problems (Objective Correlative), The Metaphysical Poets (Dissociation of Sensibility)' },
          { name: 'I.A. Richards: Principles of Literary Criticism (1924), Practical Criticism (1929) - Four kinds of meaning (Sense, Feeling, Tone, Intention), Synaesthesis' },
          { name: 'William Empson: Seven Types of Ambiguity (1930)' },
          { name: 'F.R. Leavis & Scrutiny Group: The Great Tradition, Moral seriousness in literature' },
        ],
      },
    ],
  },
  {
    unitNumber: 8,
    title: 'Unit VIII: Literary Theory (Post-World War II)',
    topics: [
      {
        name: 'New Criticism and Russian Formalism',
        subtopics: [
          { name: 'Russian Formalism: Viktor Shklovsky (Defamiliarization / Ostranenie, Fabula vs Syuzhet), Boris Eikhenbaum, Roman Jakobson (Metaphor and Metonymy poles)' },
          { name: 'American New Criticism: John Crowe Ransom, Cleanth Brooks (The Well Wrought Urn - Language of Paradox, Heresy of Paraphrase), W.K. Wimsatt & Monroe Beardsley (The Intentional Fallacy, The Affective Fallacy), Allen Tate (Tension in Poetry)' },
        ],
      },
      {
        name: 'Structuralism and Post-Structuralism / Deconstruction',
        subtopics: [
          { name: 'Structuralism: Ferdinand de Saussure, Claude Lévi-Strauss (Mythemes), Roland Barthes (Mythologies, The Death of the Author 1967, S/Z - Readerly vs Writerly texts)' },
          { name: 'Deconstruction: Jacques Derrida (Of Grammatology 1967, Structure, Sign and Play - Différance, Logocentrism, Trace, Sous Rature / Under Erasure, Transcendental Signified)' },
          { name: 'Yale School of Deconstruction: Paul de Man (Allegories of Reading - Blindness and Insight), J. Hillis Miller, Geoffrey Hartman' },
        ],
      },
      {
        name: 'Psychoanalytic and Marxist Theories',
        subtopics: [
          { name: 'Psychoanalytic: Sigmund Freud (Id, Ego, Superego, Oedipus Complex, Dream-work, The Uncanny), Jacques Lacan (The Mirror Stage, Imaginary, Symbolic, Real orders, The Unconscious is structured like a language), Carl Jung (Archetypes, Collective Unconscious), Harold Bloom (The Anxiety of Influence - Six Revisionary Ratios)' },
          { name: 'Marxist Criticism: Karl Marx, Georg Lukács (Historical Novel, Reification), Walter Benjamin, Bertolt Brecht, Louis Althusser, Terry Eagleton (Marxism and Literary Criticism), Fredric Jameson (The Political Unconscious - Always historicize!, Postmodernism, or, the Cultural Logic of Late Capitalism)' },
        ],
      },
      {
        name: 'Feminist, Gender and Queer Theory',
        subtopics: [
          { name: 'Foundational Feminism: Simone de Beauvoir (The Second Sex 1949 - One is not born, but rather becomes, a woman), Virginia Woolf, Betty Friedan' },
          { name: 'Gynocriticism & French Feminism: Elaine Showalter (A Literature of Their Own - Feminine, Feminist, Female phases; Towards a Feminist Poetics), Hélène Cixous (The Laugh of the Medusa - Écriture féminine), Luce Irigaray, Julia Kristeva (Semiotique vs Symbolique, Abjection)' },
          { name: 'Black & Postcolonial Feminism: Gayatri Spivak (Can the Subaltern Speak?), bell hooks (Ain’t I a Woman?), Alice Walker (Womanism)' },
          { name: 'Queer Theory: Judith Butler (Gender Trouble 1990 - Gender Performativity), Eve Kosofsky Sedgwick (Epistemology of the Closet)' },
        ],
      },
      {
        name: 'Postcolonialism, New Historicism, Cultural Materialism & Ecocriticism',
        subtopics: [
          { name: 'Postcolonial Theory: Edward Said (Orientalism 1978, Culture and Imperialism), Homi Bhabha (The Location of Culture - Mimicry, Hybridity, Third Space, Ambivalence), Gayatri Spivak (Strategic Essentialism, Epistemic Violence), Frantz Fanon (Black Skin, White Masks; The Wretched of the Earth)' },
          { name: 'New Historicism & Cultural Materialism: Stephen Greenblatt (Renaissance Self-Fashioning - Poetics of Culture), Jonathan Dollimore, Alan Sinfield (Faultlines)' },
          { name: 'Reader-Response Criticism: Wolfgang Iser (Implied Reader, Gaps), Hans Robert Jauss (Horizon of Expectations), Stanley Fish (Interpretive Communities)' },
          { name: 'Ecocriticism & Posthumanism: Cheryll Glotfelty (The Ecocriticism Reader), Lawrence Buell, Timothy Morton (Dark Ecology), Cary Wolfe' },
        ],
      },
    ],
  },
  {
    unitNumber: 9,
    title: 'Unit IX: Research Methods and Materials in English',
    topics: [
      {
        name: 'Research Methodologies and Theoretical Frameworks in Literature',
        subtopics: [
          { name: 'Qualitative, Interpretive, and Hermeneutic Research Paradigms in Humanities' },
          { name: 'Textual Criticism: Copy-text, Critical Edition, Variorum Edition, Stemmatics' },
          { name: 'Archival Research, Discourse Analysis, Oral History and Manuscript Studies' },
        ],
      },
      {
        name: 'Documentation Styles and Mechanics of Thesis Writing',
        subtopics: [
          { name: 'MLA Handbook (8th & 9th Editions): Core Elements (Author, Title of Source, Title of Container, Other Contributors, Version, Number, Publisher, Publication Date, Location)' },
          { name: 'In-text Parenthetical Citations, Block Quotations, Ellipses, Works Cited entries' },
          { name: 'APA and Chicago Manual of Style comparisons in interdisciplinary humanities research' },
        ],
      },
      {
        name: 'Research Ethics, Academic Integrity and Plagiarism',
        subtopics: [
          { name: 'Plagiarism definitions: Direct copying, Mosaic/Patchwriting, Paraphrasing without citation, Self-plagiarism' },
          { name: 'UGC Regulations 2018 on Academic Integrity and Levels of Plagiarism Penalties' },
          { name: 'Plagiarism Detection Tools (Turnitin, Urkund/Ouriginal) and Similarity Indices' },
          { name: 'Copyright Law, Fair Use Doctrine, Creative Commons Licenses (CC-BY), Open Access repositories (Shodhganga, JSTOR, Project MUSE)' },
        ],
      },
    ],
  },
  {
    unitNumber: 10,
    title: 'Unit X: World Literature, Comparative Literature & Translation Studies',
    topics: [
      {
        name: 'World Literature and Comparative Literature Concepts',
        subtopics: [
          { name: 'Goethe’s Concept of Weltliteratur (World Literature)' },
          { name: 'David Damrosch (What is World Literature? - Circulating beyond origin)' },
          { name: 'Comparative Literature Schools: French School (Influence, Direct contact) vs American School (Interdisciplinary, Thematics)' },
        ],
      },
      {
        name: 'European, Russian and Latin American Masterpieces in Translation',
        subtopics: [
          { name: 'Greek/Roman: Homer (Iliad, Odyssey), Dante Alighieri (Divine Comedy)' },
          { name: 'Russian Masters: Leo Tolstoy (War and Peace, Anna Karenina), Fyodor Dostoevsky (Crime and Punishment, The Brothers Karamazov)' },
          { name: 'European Modern: Franz Kafka (The Trial), Albert Camus (The Stranger / The Outsider)' },
          { name: 'Latin American Boom: Gabriel García Márquez (One Hundred Years of Solitude - Magic Realism), Jorge Luis Borges, Pablo Neruda' },
        ],
      },
      {
        name: 'Translation Studies: Theories, Models and Equivalence',
        subtopics: [
          { name: 'Translation Models: Roman Jakobson (Intralingual, Interlingual, Intersemiotic translation)' },
          { name: 'Eugene Nida: Formal Equivalence vs Dynamic Equivalence' },
          { name: 'Lawrence Venuti: The Translator’s Invisibility (Domestication vs Foreignization)' },
          { name: 'George Steiner: After Babel (Hermeneutic Motion - Trust, Aggression, Incorporation, Restitution)' },
          { name: 'Skopos Theory: Hans Vermeer, Katharina Reiss' },
          { name: 'Susan Bassnett & André Lefevere: Cultural Turn in Translation Studies (Translation, Rewriting, and Manipulation)' },
        ],
      },
      {
        name: 'Indian Literature in English Translation',
        subtopics: [
          { name: 'Classical Indian texts in translation: Kalidasa (Abhijnanasakuntalam - William Jones translation)' },
          { name: 'Bhakti & Modern Indian Masters translated into English: Rabindranath Tagore (Gitanjali), Premchand, Mahasweta Devi (Draupadi - translated by Gayatri Spivak), U.R. Ananthamurthy (Samskara - translated by A.K. Ramanujan), Bama (Karukku - translated by Lakshmi Holmström)' },
        ],
      },
    ],
  },
];
