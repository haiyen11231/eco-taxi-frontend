import "./VoucherCard.module.scss";

const VoucherCard = () => {
  return (
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Title</h2>
      </div>
      <div class="card__body">
        <p class="card__text">Lorem ipsum dolor sit amet.</p>
      </div>
      <div class="card__footer card__footer--highlighted">
        <button class="card__button">Click me</button>
      </div>
    </div>
  );
};

export default VoucherCard;
