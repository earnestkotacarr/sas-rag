import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="welcome-page flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-5xl font-bold mb-6">Welcome to SAS Hero</h1>
      <h2 className="text-2xl font-light mb-8">
        データ分析タスクに最適なファイル、データ、モデル、アセット、同僚を見つけ出し、提案します。
      </h2>
      <p className="text-lg mb-12 max-w-3xl">
        既存の資産のメタデータからナレッジグラフを生成することで、即座に回答が得られるよう情報カタログ検索を強化します。このナレッジグラフはファイル（データ、モデル、資産）とユーザーを結びつけ、SAS Heroが関連するリソース、コラボレーター、データ分析手法を提案できるようにします。その結果、データ分析を迅速かつ効率的に開始することができます。メタデータのみを使用することで、プライバシーとセキュリティが確実に維持されます。
      </p>
      <Link to="/catalog">
        <button className="bg-primary text-white px-8 py-4 rounded-full text-xl hover:bg-secondary transition duration-300">
        今すぐ体験
        </button>
      </Link>
      {/* Added attribution line here */}
      <p className="text-sm mt-8 text-gray-600">
        Made by Earnest Kota Carr under supervision of Izumi Kobayashi
      </p>
    </div>
  );
}
