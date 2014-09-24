require 'rails_helper'

RSpec.describe Suggestion, :type => :model do

  describe 'validating a suggestion' do

    context 'without a name' do
      subject(:instance) { build(:suggestion) }

      it 'fails validation' do
        expect(instance.valid?).to eq(false)
      end
    end

    context 'with a name' do
      subject(:instance) { build(:suggestion, :with_name) }

      it 'validates' do
        expect(instance.valid?).to eq(true)
      end
    end

  end

end
