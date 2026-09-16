import { PortfolioHeader, PortfolioFooter } from '@/components/portfolio';
import '../home.css';
import '../portfolio.css';

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="studio-home portfolio-page">
      <a className="studio-skip" href="#portfolio-content">
        跳到作品内容
      </a>
      <PortfolioHeader />
      <main className="studio-container" id="portfolio-content">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}
