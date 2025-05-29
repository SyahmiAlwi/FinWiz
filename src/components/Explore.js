import React, { useState } from 'react';
import { GlobeAltIcon, LinkIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Expanded quiz questions
const quizQuestions = [
  { question: 'What percentage of your income should ideally go to savings?', options: ['5%', '10%', '20%', '50%'], answer: '20%' },
  { question: 'Diverse investment helps reduce...', options: ['Liquidity', 'Risk', 'Interest rates', 'Inflation'], answer: 'Risk' },
  { question: 'Which account is best for emergency funds?', options: ['Checking', 'Savings', 'Stock Market', 'Real Estate'], answer: 'Savings' },
  { question: 'A budget surplus means...', options: ['You spent more than earned', 'You earned more than spent', 'Income equals expenses', 'No income'], answer: 'You earned more than spent' },
  { question: 'What is a key benefit of compound interest?', options: ['Simple growth', 'Faster debt', 'Exponential growth', 'No growth'], answer: 'Exponential growth' },
  { question: 'Diversification in investing helps to...', options: ['Increase fees', 'Reduce risk', 'Guarantee profit', 'Eliminate taxes'], answer: 'Reduce risk' },
];

const Explore = () => {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [debt, setDebt] = useState('');
  const [healthReport, setHealthReport] = useState(null);

  const [currentQ, setCurrentQ] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [showAllResources, setShowAllResources] = useState(false);

  const lenders = [
  { name: 'JPA', url: 'https://www.jpa.gov.my', description: 'Provides scholarships and loan grants. Knowing JPA helps you access funding opportunities and understand eligibility criteria for your education finances. Visit their site for application details and deadlines.' },
  { name: 'PTPTN', url: 'https://www.ptptn.gov.my', description: 'Issues student loans for higher education. PTPTN is essential for low-interest financing options and repayment schemes. Check their site for loan eligibility, repayment calculators, and disbursement schedules.' },
  { name: 'MARA', url: 'https://www.mara.gov.my', description: 'Supports students with loans and educational programs. MARA offers tailored loans and bursaries. Explore their website to learn about program requirements, scholarship applications, and empowerment initiatives.' },
];

  const resources = [
    { title: 'Financial Faiz', url: 'https://www.youtube.com/@FinancialFaiz', platform: 'YouTube' },
    { title: 'Afham Yusof', url: 'https://www.youtube.com/@afhamyusof', platform: 'YouTube' },
    { title: 'Mr Money TV', url: 'https://www.youtube.com/@MrMoneyTV', platform: 'YouTube' },
    { title: 'Direct Lending', url: 'https://www.tiktok.com/@directlendingmy?lang=en', platform: 'TikTok' },
    { title: 'PTree Sulaiman | Simpanan Emas', url: 'https://www.tiktok.com/@ptree_sulaiman?lang=en', platform: 'TikTok' },
    { title: 'AbangJakPar', url: 'https://www.tiktok.com/@faredabdullah?lang=en', platform: 'TikTok' },
    { title: 'Investopedia', url: 'https://www.investopedia.com', platform: 'Web' },
    { title: 'LinkedIn Guide', url: 'https://www.linkedin.com/pulse/10-ways-college-student-can-start-own-financial-plan-guddi-sharma-advjc/', platform: 'LinkedIn' },
  ];

  // Financial health check
  const handleHealthCheck = (e) => {
    e.preventDefault();
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    const dbt = parseFloat(debt) || 0;
    // savings rate
    const saveRate = inc > 0 ? ((inc - exp) / inc) * 100 : 0;
    // debt-to-income ratio
    const dti = inc > 0 ? (dbt / inc) * 100 : 0;
    // emergency fund recommendation (3-6 months)
    const recommendedEmergency = inc > 0 ? (inc * 3).toFixed(2) : 0;

    let advice = [];
    if (saveRate < 20) advice.push('Aim to save at least 20% of your income.');
    else advice.push('Great job on a healthy savings rate!');
    if (dti > 36) advice.push('Your debt-to-income ratio is high. Consider reducing debt.');
    else advice.push('Your debt-to-income ratio is within a healthy range.');
    advice.push(`Recommended emergency fund: RM ${recommendedEmergency} (${inc > 0 ? '3 months' : 'N/A'}).`);

    setHealthReport({ saveRate: saveRate.toFixed(1), dti: dti.toFixed(1), advice });
  };

  const handleOptionSelect = opt => setQuizAnswers({ ...quizAnswers, [currentQ]: opt });

  const handleNextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) setCurrentQ(currentQ + 1);
    else {
      const correct = quizQuestions.reduce((sum, q, idx) => sum + (quizAnswers[idx] === q.answer ? 1 : 0), 0);
      setQuizResult(`${correct} / ${quizQuestions.length} correct`);
    }
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.div className="relative p-6 lg:p-10 space-y-12" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>

      {/* About Section */}
      <motion.section className="relative bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white py-16 px-6 rounded-lg overflow-hidden" variants={fadeIn}>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Welcome to <span className="inline-flex items-center gap-2"> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5a1 1 0 100 2 1 1 0 000-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              FinWiz
            </span>
          </h1>
          <p className="text-lg md:text-xl">Your one-stop platform for budgeting, loan management, and financial literacy.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0" style={{ height: 100 }}>
          <svg viewBox="0 0 500 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,40 C150,80 350,0 500,40 L500,100 L0,100 Z" fill="#f2f3f5" />
          </svg>
        </div>
      </motion.section>

      {/* Lenders Section */}
      <motion.section className="rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Lender Organizations</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {lenders.map(l => (
              <motion.a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                className="p-6 bg-white rounded-lg shadow-xl border-l-4 border-[#0BCDAA] hover:shadow-2xl hover:-translate-y-1 transition"
                whileHover={{ scale: 1.02 }}>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <LinkIcon className="h-6 w-6 text-[#0BCDAA]" /> {l.name}
                </h3>
                <p className="prose text-gray-600">{l.description}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

      {/* Resources Section with See More */}
      <motion.section className="py-12 rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center">Financial Advice Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {(showAllResources ? resources : resources.slice(0,4)).map(r => (
              <motion.a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer"
                className="p-6 bg-gray-50 rounded-lg shadow-xl border hover:shadow-2xl hover:-translate-y-1 transition"
                whileHover={{ scale: 1.02 }}>
                <h3 className="text-2xl font-bold mb-2">{r.title}</h3>
                <p className="text-sm text-gray-500">Platform: {r.platform}</p>
              </motion.a>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllResources(!showAllResources)}
              className="py-2 px-6 bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white rounded-lg shadow hover:from-[#05A6D4] hover:to-[#0BCDAA] transition transform hover:-translate-y-1"
            >{showAllResources ? 'See Less' : 'See More'}
            </button>
          </div>
        </motion.section>

      {/* Financial Health Check */}
      <motion.section className="py-12 rounded-lg" variants={fadeIn}>
          <h2 className="text-3xl font-semibold mb-6 text-center flex justify-center items-center gap-2"><ChartBarIcon className="h-8 w-8 text-[#05A6D4]" /> Advanced Financial Health Check</h2>
          <form onSubmit={handleHealthCheck} className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Income (RM)</label>
            <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 5000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Expenses (RM)</label>
            <input type="number" value={expenses} onChange={e => setExpenses(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 3000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Monthly Debt (RM)</label>
            <input type="number" value={debt} onChange={e => setDebt(e.target.value)} className="mt-1 w-full p-2 border rounded" placeholder="e.g. 1000" />
          </div>
          <button type="submit" className="py-2 px-4 bg-[#05A6D4] text-white rounded hover:bg-[#0BCDAA] transition transform hover:-translate-y-1 col-span-full md:col-span-1">Check Health</button>
        </form>
        {healthReport && (
            <div className="max-w-4xl mx-auto mt-8 prose lg:prose-lg">
              <h3>Results:</h3>
              <p><strong>Savings Rate:</strong> {healthReport.saveRate}%</p>
              <p><strong>Debt-to-Income Ratio:</strong> {healthReport.dti}%</p>
              <h4>Advice:</h4>
              <ul>
                {healthReport.advice.map((tip,i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
      </motion.section>

      {/* Quiz Section */}
      <motion.section className="bg-white p-6  rounded-lg shadow-xl border-l-4" variants={fadeIn}>
        <h2 className="text-3xl font-semibold mb-6 text-center">Financial Literacy Quiz</h2>
        <div className="max-w-4xl mx-auto">
          {quizResult ? (
            <p className="text-lg font-bold text-gray-800 text-center">You scored: {quizResult}</p>
          ) : (
            <>
              <p className="mb-4 text-xl font-medium">{quizQuestions[currentQ].question}</p>
              <div className="space-y-3">
                {quizQuestions[currentQ].options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleOptionSelect(opt)}
                    className={`block w-full text-left p-4 bg-gray-50 rounded-lg border ${quizAnswers[currentQ] === opt ? 'border-[#0BCDAA] bg-[#ECFEF9]' : 'border-gray-200'} transition transform hover:-translate-y-1`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div className="text-right mt-6">
                <button
                  onClick={handleNextQuestion}
                  disabled={quizAnswers[currentQ] === undefined}
                  className="py-2 px-6 bg-gradient-to-r from-[#0BCDAA] to-[#05A6D4] text-white rounded-lg shadow hover:from-[#05A6D4] hover:to-[#0BCDAA] transition transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {currentQ < quizQuestions.length - 1 ? 'Next' : 'Finish'}
                </button>
              </div>
            </>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Explore;
